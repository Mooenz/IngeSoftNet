<?php
// Configuración de errores en producción
error_reporting(0);
ini_set('display_errors', 0);

// Headers de seguridad
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Verificar método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

// Verificar origen de la petición (CSRF básico)
$allowed_origins = ['https://ingesoftnet.com', 'https://www.ingesoftnet.com'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';

if (!empty($origin)) {
    $is_allowed = false;
    foreach ($allowed_origins as $allowed) {
        if (strpos($origin, $allowed) === 0) {
            $is_allowed = true;
            break;
        }
    }
    
    if (!$is_allowed && $_SERVER['SERVER_NAME'] !== 'localhost') {
        http_response_code(403);
        echo json_encode(['success' => false, 'error' => 'Origen no permitido']);
        exit;
    }
}

// Rate limiting básico
session_start();
$current_time = time();
$submit_limit = 3;
$time_window = 300;

if (!isset($_SESSION['submit_times'])) {
    $_SESSION['submit_times'] = [];
}

$_SESSION['submit_times'] = array_filter($_SESSION['submit_times'], function($time) use ($current_time, $time_window) {
    return ($current_time - $time) < $time_window;
});

if (count($_SESSION['submit_times']) >= $submit_limit) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Demasiados intentos. Intenta más tarde.']);
    exit;
}

// Función de sanitización
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Función de validación de email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Honeypot check
if (!empty($_POST['website'])) {
    error_log('Posible spam detectado desde IP: ' . $_SERVER['REMOTE_ADDR']);
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit;
}

// Recibir y validar datos
$nombre = sanitize_input($_POST['nombreContacto'] ?? '');
$apellido = sanitize_input($_POST['apellidoContacto'] ?? '');
$telefono = sanitize_input($_POST['telefonoContacto'] ?? '');
$asunto = sanitize_input($_POST['asuntoContacto'] ?? '');
$email = sanitize_input($_POST['emailContacto'] ?? '');
$mensaje = sanitize_input($_POST['mensajeContacto'] ?? '');
$terminos = isset($_POST['terminosContacto']) && $_POST['terminosContacto'] === 'on';

// Validaciones
$errors = [];

if (empty($nombre) || strlen($nombre) > 100) {
    $errors[] = 'Nombre inválido';
}

if (empty($apellido) || strlen($apellido) > 100) {
    $errors[] = 'Apellido inválido';
}

if (empty($telefono) || strlen($telefono) > 20) {
    $errors[] = 'Teléfono inválido';
}

if (!in_array($asunto, ['informacion-productos', 'soporte-tecnico', 'otros'])) {
    $errors[] = 'Asunto inválido';
}

if (empty($email) || !validate_email($email) || strlen($email) > 100) {
    $errors[] = 'Email inválido';
}

if (strlen($mensaje) > 1000) {
    $errors[] = 'Mensaje demasiado largo';
}

if (!$terminos) {
    $errors[] = 'Debe aceptar los términos';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'error' => 'Datos inválidos',
        'details' => $errors
    ]);
    exit;
}

// Cargar configuración
$config_path = '/home/ingesoft/config.php';

if (!file_exists($config_path)) {
    error_log('Archivo de configuración no encontrado en: ' . $config_path);
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error de configuración']);
    exit;
}

$config = require $config_path;

// Verificar que exista PHPMailer
// if (!file_exists(dirname(__DIR__, 2) . '/phpmailer/autoload.php')) {
//     error_log('PHPMailer no instalado');
//     http_response_code(500);
//     echo json_encode(['success' => false, 'error' => 'Error de configuración']);
//     exit;
// }

require __DIR__ . '/../../phpmailer/src/PHPMailer.php';
require __DIR__ . '/../../phpmailer/src/SMTP.php';
require __DIR__ . '/../../phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Mapear asunto legible
$asuntos_map = [
    'informacion-productos' => 'Información sobre productos',
    'soporte-tecnico' => 'Soporte técnico',
    'otros' => 'Otros'
];
$asunto_legible = $asuntos_map[$asunto] ?? $asunto;

// Preparar HTML
$html_content = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #ffffff; }
        .field { margin-bottom: 15px; display: flex; align-items: center; gap: 12px; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; margin-left: 12px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Nuevo mensaje de contacto</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Nombre completo:</div>
                <div class="value">' . htmlspecialchars($nombre . ' ' . $apellido, ENT_QUOTES, 'UTF-8') . '</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '">' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</a></div>
            </div>
            <div class="field">
                <div class="label">Teléfono:</div>
                <div class="value">' . htmlspecialchars($telefono, ENT_QUOTES, 'UTF-8') . '</div>
            </div>
            <div class="field">
                <div class="label">Asunto:</div>
                <div class="value">' . htmlspecialchars($asunto_legible, ENT_QUOTES, 'UTF-8') . '</div>
            </div>
            ' . (!empty($mensaje) ? '
            <div class="field">
                <div class="label">Mensaje:</div>
                <div class="value">' . nl2br(htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8')) . '</div>
            </div>
            ' : '') . '
            <div class="field">
                <div class="label">Fecha:</div>
                <div class="value">' . date('d/m/Y H:i:s') . '</div>
            </div>
            <div class="field">
                <div class="label">IP:</div>
                <div class="value">' . htmlspecialchars($_SERVER['REMOTE_ADDR'] ?? 'Desconocida', ENT_QUOTES, 'UTF-8') . '</div>
            </div>
        </div>
        <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de INGESOFTNET S.A.S.</p>
        </div>
    </div>
</body>
</html>
';

// Crear instancia de PHPMailer
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->Encoding = 'base64';

try {
    // Configuración SMTP
    $mail->isSMTP();
    $mail->Host =  'mail.ingesoftnet.com';
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'] ?? '';
    $mail->Password = $config['smtp_password'] ?? '';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $config['smtp_port'] ?? 587;

    // Destinatarios
    $mail->setFrom('no-reply@ingesoftnet.com', 'Formulario Web INGESOFTNET');
    $mail->addAddress('soporte@ingesoftnet.com'); // Cambiar por tu email
    $mail->addReplyTo($email, $nombre . ' ' . $apellido);

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = 'Contacto Web: ' . $asunto_legible;
    $mail->Body = $html_content;
    $mail->AltBody = strip_tags($html_content);

    // Enviar
    $mail->send();

    // Registrar envío exitoso
    $_SESSION['submit_times'][] = $current_time;
    error_log('Email enviado exitosamente desde: ' . $email);

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    error_log('Error al enviar email: ' . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error al enviar el mensaje. Por favor, intenta más tarde.'
    ]);
}
?>