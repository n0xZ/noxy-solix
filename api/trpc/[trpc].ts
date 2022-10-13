import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from '../src/routers/_app'
import { createContext } from '../src/utils'

export default createNextApiHandler({
	router: appRouter,
	createContext: createContext,
})
