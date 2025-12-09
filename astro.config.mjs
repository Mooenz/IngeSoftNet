// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import critters from 'astro-critters';
import sitemap from '@astrojs/sitemap';
import { ChangeFreqEnum } from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://ingesoftnet.com',
	base: '/',
	integrations: [
		critters(),
		sitemap({
			filter: (page) => page !== 'https://ingesoftnet.com/secret-page/',
			customPages: ['https://ingesoftnet.com/external-page'],
			serialize(item) {
				// Configuración por URL
				if (item.url === 'https://ingesoftnet.com/') {
					item.changefreq = ChangeFreqEnum.MONTHLY;
					item.priority = 1.0;
				}

				if (item.url === 'https://ingesoftnet.com/contacto/') {
					item.changefreq = ChangeFreqEnum.MONTHLY;
					item.priority = 0.9;
				}

				if (item.url === 'https://ingesoftnet.com/nosotros/') {
					item.changefreq = ChangeFreqEnum.MONTHLY;
					item.priority = 0.7;
				}

				if (item.url === 'https://ingesoftnet.com/manual-procesos/') {
					item.changefreq = ChangeFreqEnum.WEEKLY;
					item.priority = 0.9;
				}

				if (item.url === 'https://ingesoftnet.com/responsabilidad-social/') {
					item.changefreq = ChangeFreqEnum.MONTHLY;
					item.priority = 0.5;
				}

				if (item.url === 'https://ingesoftnet.com/politica-de-privacidad/' || item.url === 'https://ingesoftnet.com/terminos-y-condiciones/') {
					item.changefreq = ChangeFreqEnum.YEARLY;
					item.priority = 0.3;
				}

				return item;
			},
		}),
	],
	vite: {
		assetsInclude: ['**/*.zip', '**/*.rar', '**/*.7z', '**/*.tar.gz'],
		optimizeDeps: {
			include: ['plyr'],
		},
		build: {
			cssCodeSplit: true,

			rollupOptions: {
				css: {
					transformer: 'lightningcss',
				},
			},
		},
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': path.resolve('./src'),
				'@public': path.resolve('./public'),
				'@assets': path.resolve('./src/assets'),
				'@components': path.resolve('./src/components'),
				'@styles': path.resolve('./src/styles'),
				'@scripts': path.resolve('./src/scripts'),
			},
		},
	},
});
