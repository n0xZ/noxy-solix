import { t } from '../utils'

export const productsRouter = t.router({
	getUsers: t.procedure.query(() => {
		return {
			greetings: 'Hola mundo',
		}
	}),
})
