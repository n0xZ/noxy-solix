import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { PrismaClient } from '@prisma/client'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import superjson from 'superjson'
const prisma = new PrismaClient()

export const createContext = (opts: CreateNextContextOptions) => ({
	...opts,
	prisma,
})

export const t = initTRPC
	.context<inferAsyncReturnType<typeof createContext>>()
	.create({ transformer: superjson })
