/* @refresh reload */
import { render } from 'solid-js/web'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { TRPCProvider } from 'solid-trpc'
import { Router } from '@solidjs/router'
import { client } from './utils/trpc'
import App from './App'
import 'virtual:windi.css'
const queryClient = new QueryClient()
render(
	() => (
		<Router>
			<TRPCProvider client={client} queryClient={queryClient}>
				<App />
			</TRPCProvider>
		</Router>
	),
	document.getElementById('root') as HTMLElement
)
