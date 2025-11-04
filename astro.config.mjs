// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
	site: 'https://Mooenz.github.io',
	vite: {
		optimizeDeps: {
			include: ['plyr'],
		},
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': path.resolve('./src'),
				'@assets': path.resolve('./src/assets'),
				'@components': path.resolve('./src/components'),
				'@styles': path.resolve('./src/styles'),
			},
		},
	},
});
