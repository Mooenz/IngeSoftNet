import services1 from '@assets/servicesImages/servicio-de-venta-de-licencias-SysCafé.jpg';
import services2 from '@assets/servicesImages/soporte-y-mantenimiento-de-alto-nivel.jpg';
import services3 from '@assets/servicesImages/implementación-del-software-SysCafé.jpg';
import services4 from '@assets/servicesImages/asesoría-contable-y-tributaria.jpg';

const services = [
	{
		title: 'Servicio de venta de licencias SysCafé',
		description: 'Obtén tu licencia oficial SysCafé con asesoría experta y activación confiable para mantener tus procesos contables siempre actualizados y seguros.',
		image: services1.src || services1,
	},
	{
		title: 'Soporte y mantenimiento de alto nivel',
		description: 'Disfruta de un servicio especializado que garantiza el óptimo funcionamiento de tu sistema, con atención rápida y soluciones que previenen interrupciones en tu negocio.',
		image: services2.src || services2,
	},
	{
		title: 'Implementación del software SysCafé',
		description: 'Recibe una instalación profesional con configuración personalizada, asegurando que tu software esté listo para potenciar tus operaciones desde el primer día.',
		image: services3.src || services3,
	},
	{
		title: 'Asesoría contable y tributaria',
		description: 'Accede a un servicio profesional que te ayuda a cumplir con la normativa fiscal y optimizar la gestión financiera de tu negocio con confianza y respaldo experto.',
		image: services4.src || services4,
	},
];

export default services;
