import { NavLink, Outlet, useNavigate } from '@solidjs/router'
import { AuthSession } from '@supabase/supabase-js'
import { createEffect, createSignal } from 'solid-js'
import { supabase } from '~/lib/supabase'

export default function HomeOutlet() {
	const [session, setSession] = createSignal<AuthSession | null>()
	const navigate = useNavigate()
	createEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})
		supabase.auth.onAuthStateChange((_event, session) => {
			if (_event === 'SIGNED_OUT') {
				navigate('/login')
			}

			setSession(session)
		})
	})
	const handleSignOut = () => {
		supabase.auth.signOut()
	}
	return (
		<>
			<header class="p-5 border-dark-50 border-b-2">
				<nav class="flex flex-row items-center justify-between container mx-auto max-w-5xl font-mulish">
					<h1>{session()?.user.email}</h1>
					<ul class="flex flex-row items-center">
						<li>
							<NavLink href="/home/">Agenda de compra</NavLink>
						</li>
						<li>
							<button onClick={() => handleSignOut()}>Cerrar sesión</button>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</>
	)
}
