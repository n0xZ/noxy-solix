/* @refresh reload */
import { render } from 'solid-js/web'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Router } from '@solidjs/router'
import 'virtual:windi.css'
import App from './App'
const queryClient = new QueryClient()
render(
	() => (
		<Router>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Router>
	),
	document.getElementById('root') as HTMLElement
)
