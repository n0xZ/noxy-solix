import { t } from '../utils'
import { productsRouter } from './products'

export const appRouter = t.mergeRouters(productsRouter)

export type IAppRouter = typeof appRouter
