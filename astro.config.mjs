// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import critters from 'astro-critters';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://Mooenz.github.io',
	base: '/IngeSoftNet/',
	// site: 'https://ingesoftnet.com',
	// base: '/',
	integrations: [critters(), sitemap()],
	vite: {
		assetsInclude: ['**/*.zip', '**/*.rar', '**/*.7z', '**/*.tar.gz'],
		optimizeDeps: {
			include: ['plyr'],
		},
		build: {
			cssCodeSplit: true,

			rollupOptions: {
				css: {
					// Transformaciones CSS con Lightning CSS (más rápido)
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
