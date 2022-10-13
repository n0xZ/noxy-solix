import { IAppRouter } from '@/routers/_app'
import { createTRPCSolid } from 'solid-trpc'
import { httpBatchLink } from '@trpc/client'

export const trpc = createTRPCSolid<IAppRouter>()
export const client = trpc.createClient({
	links: [
		httpBatchLink({
			url: '/api/trpc',
		}),
	],
})
