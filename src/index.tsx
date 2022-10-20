/* @refresh reload */
import { render } from 'solid-js/web'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { MetaProvider } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { Toaster } from 'solid-toast'
import 'virtual:windi.css'
import './reset.css'
import App from './App'
const queryClient = new QueryClient()
render(
	() => (
		<Router>
			<QueryClientProvider client={queryClient}>
				<MetaProvider>
					<App />
					<Toaster position="top-right" />
				</MetaProvider>
			</QueryClientProvider>
		</Router>
	),
	document.getElementById('root') as HTMLElement
)
