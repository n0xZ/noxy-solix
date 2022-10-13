import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import WindiCSS from 'vite-plugin-windicss'

import Pages from 'vite-plugin-pages'

export default defineConfig({
	plugins: [solidPlugin(), WindiCSS(), Pages()],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
})
