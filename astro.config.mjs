// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
	site: 'https://Mooenz.github.io',
	base: '/IngeSoftNet/',
	vite: {
		optimizeDeps: {
			include: ['plyr'],
		},
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': path.resolve('./src'),
				'@public': path.resolve('./public'),
				'@assets': path.resolve('./src/assets'),
				'@components': path.resolve('./src/components'),
				'@styles': path.resolve('./src/styles'),
			},
		},
	},
});
