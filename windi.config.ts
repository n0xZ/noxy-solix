import { defineConfig } from 'windicss/helpers'

export default defineConfig({
	plugins: [require('windicss/plugin/forms')],
	theme: {
		fontFamily: {
			mulish: ['Mulish', 'sans-serif'],
			workSans: ['Work Sans', 'sans-serif'],
		},
	},
})
