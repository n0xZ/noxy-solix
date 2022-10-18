import { NavLink, Outlet, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { AiFillHome } from 'solid-icons/ai'

import { supabase } from '~/lib/supabase'

export default function HomeOutlet() {
	const navigate = useNavigate()
	createEffect(() => {
		supabase.auth.onAuthStateChange((_event, _) => {
			if (_event === 'SIGNED_OUT') {
				navigate('/login')
			}
		})
	})

	const handleSignOut = () => {
		supabase.auth.signOut()
	}
	return (
		<>
			<header class="p-5 border-dark-800 border-b-2">
				<nav class="flex flex-row items-center justify-between container mx-auto max-w-5xl font-mulish">
					<h1>
						<NavLink
							href="/home"
							class="flex flex-row items-center space-x-4"
							activeClass="text-emerald-300"
						>
							<AiFillHome height={300} width={300} />
							<span>Home</span>
						</NavLink>
					</h1>
					<ul class="xl:flex lg:flex hidden flex-row items-center space-x-5">
						<li>
							<NavLink href="/home/list" activeClass="text-emerald-300">
								Agenda de compra
							</NavLink>
						</li>
						<li>
							<button
								onClick={() => handleSignOut()}
								class="px-5 py-3 rounded-lg border-2 border-emerald-300 hover:bg-emerald-600 hover:border-dark-600 duration-100 ease-out"
							>
								Cerrar sesión
							</button>
						</li>
					</ul>
				</nav>
			</header>
			<main class="h-screen">
				<Outlet />
			</main>
		</>
	)
}
