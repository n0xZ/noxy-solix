import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import WindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'
import Pages from 'vite-plugin-pages'
export default defineConfig({
	plugins: [solidPlugin(), WindiCSS(), Pages(), VitePWA()],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
})
