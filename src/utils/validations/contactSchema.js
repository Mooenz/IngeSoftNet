import { z } from 'zod';

export const contactSchema = z.object({
	nombreContacto: z
		.string({ required_error: 'Completa este campo' })
		.min(1, 'Completa este campo')
		.trim()
		.min(2, 'Mínimo 2 caracteres')
		.max(50, 'Máximo 50 caracteres')
		.regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Ingresa solo letras'),

	apellidoContacto: z
		.string({ required_error: 'Completa este campo' })
		.min(1, 'Completa este campo')
		.trim()
		.min(2, 'Mínimo 2 caracteres')
		.max(50, 'Máximo 50 caracteres')
		.regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Ingresa solo letras'),

	telefonoContacto: z
		.string({ required_error: 'Completa este campo' })
		.min(1, 'Completa este campo')
		.trim()
		.min(7, 'Mínimo 7 dígitos')
		.max(10, 'Máximo 10 dígitos')
		.regex(/^[0-9]+$/, 'Ingresa solo números'),

	asuntoContacto: z.string({ required_error: 'Selecciona una opción' }).refine((val) => ['informacion-productos', 'soporte-tecnico', 'otros'].includes(val), { message: 'Selecciona una opción' }),

	emailContacto: z
		.string({ required_error: 'Ingrese un correo' })
		.trim()
		.toLowerCase()
		.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Correo con formato inválido'),

	terminosContacto: z.boolean({ required_error: 'Debes aceptar la política de privacidad' }).refine((val) => val === true, 'Debes aceptar la política de privacidad'),
});
