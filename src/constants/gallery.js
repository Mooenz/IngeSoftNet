// src/data/gallery.js

import anuncioVersiones from '@assets/informativas/anuncio_versiones_anteriores.jpg';
import autorizacionDian from '@assets/informativas/autorización_dian_pos_electrónico.jpg';
import cambioIdentificacion from '@assets/informativas/cambio_de_identificación.jpg';
import correoSpam from '@assets/informativas/correo_electrónico_spam.jpg';
import mensajesSoftware from '@assets/informativas/mensajes_software.jpg';
import notasCredito from '@assets/informativas/notas_crédito_aceptadas_.jpg';
import novedades from '@assets/informativas/novedades.jpg';
import personasNaturales from '@assets/informativas/personas_naturales_obligadas_a_declarar_renta.jpg';
import promedioFacturas from '@assets/informativas/promedio_facturas_electrónicas.jpg';
import promedioPos from '@assets/informativas/promedio_facturas_pos_.jpg';
import ransomware from '@assets/informativas/ransomware.jpg';
import restaurarClaves from '@assets/informativas/restaurar_claves.jpg';
import sancionesDian from '@assets/informativas/sanciones_dian.jpg';

const gallery = [
	{
		src: anuncioVersiones,
		alt: 'Imagen anuncio de versiones anteriores',
		width: 1080,
		height: 1080,
		title: 'Anuncio de versiones anteriores',
	},
	{
		src: autorizacionDian,
		alt: 'Imagen autorización DIAN POS electrónico',
		width: 1080,
		height: 1080,
		title: 'Autorización DIAN POS electrónico',
	},
	{
		src: cambioIdentificacion,
		alt: 'Imagen cambio de identificación',
		width: 1080,
		height: 1080,
		title: 'Cambio de identificación',
	},
	{
		src: correoSpam,
		alt: 'Imagen correo electrónico spam',
		width: 1080,
		height: 1080,
		title: 'Correo electrónico spam',
	},
	{
		src: personasNaturales,
		alt: 'Imagen personas naturales obligadas a declarar renta',
		width: 2000,
		height: 1414,
		title: 'Personas naturales obligadas a declarar renta',
	},
	{
		src: mensajesSoftware,
		alt: 'Imagen mensajes de software',
		width: 940,
		height: 788,
		title: 'Mensajes de software',
	},
	{
		src: notasCredito,
		alt: 'Imagen notas de crédito aceptadas',
		width: 940,
		height: 788,
		title: 'Notas de crédito aceptadas',
	},
	{
		src: novedades,
		alt: 'Imagen novedades',
		width: 940,
		height: 788,
		title: 'Novedades',
	},

	{
		src: promedioFacturas,
		alt: 'Imagen promedio facturas electrónicas',
		width: 2000,
		height: 1414,
		title: 'Promedio facturas electrónicas',
	},
	{
		src: promedioPos,
		alt: 'Imagen promedio facturas POS',
		width: 2000,
		height: 1414,
		title: 'Promedio facturas POS',
	},
	{
		src: ransomware,
		alt: 'Imagen ransomware',
		width: 1080,
		height: 1080,
		title: 'Ransomware',
	},
	{
		src: restaurarClaves,
		alt: 'Imagen restaurar claves',
		width: 940,
		height: 788,
		title: 'Restaurar claves',
	},
	{
		src: sancionesDian,
		alt: 'Imagen sanciones DIAN',
		width: 1414,
		height: 2000,
		title: 'Sanciones DIAN',
	},
];

export default gallery;
