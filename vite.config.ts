import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import WindiCSS from 'vite-plugin-windicss'

import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
	plugins: [
		solidPlugin(),
		WindiCSS(),
		Pages(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
			manifest: {
				name: 'Solyx - App',
				short_name: 'solyx',
				description: 'Crea tu lista de productos de manera flexible y rápida!',
				theme_color: '#ffffff',
				start_url: '/',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
	resolve: {
		alias: {
			'~': resolve('src'),
		},
	},
})
