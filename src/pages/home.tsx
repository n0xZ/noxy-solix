import { NavLink, Outlet, useNavigate } from '@solidjs/router'
import { createEffect, createSignal, onMount } from 'solid-js'
import { AiFillHome, AiOutlineBars, AiOutlineLogout } from 'solid-icons/ai'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
	Menu,
	MenuItem,
} from 'solid-headless'
import { supabase } from '~/lib/supabase'
import { AuthSession } from '@supabase/supabase-js'

function classNames(...classes: (string | boolean | undefined)[]): string {
	return classes.filter(Boolean).join(' ')
}
function NavMenu(props: { handleSignOut: () => void }) {
	return (
		<Popover defaultOpen={false} class="relative xl:hidden lg:hidden">
			{({ isOpen }) => (
				<>
					<PopoverButton
						class={classNames(
							isOpen() && 'text-opacity-90',
							'text-white group bg-dark-500 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
						)}
					>
						<AiOutlineBars
							class={classNames(
								isOpen() && 'text-opacity-70',
								'ml-2 h-5 w-5 text-emerald-300 group-hover:text-opacity-80 transition ease-in-out duration-150'
							)}
							aria-hidden="true"
						/>
					</PopoverButton>
					<Transition
						show={isOpen()}
						enter="transition duration-200"
						enterFrom="opacity-0 -translate-y-1 scale-50"
						enterTo="opacity-100 translate-y-0 scale-100"
						leave="transition duration-150"
						leaveFrom="opacity-100 translate-y-0 scale-100"
						leaveTo="opacity-0 -translate-y-1 scale-50"
					>
						<PopoverPanel
							unmount={false}
							class="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
						>
							<Menu class="overflow-hidden w-72 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-dark-800 flex flex-col space-y-1 p-1">
								<MenuItem
									as="button"
									class="text-sm p-1 text-left rounded flex flex-row items-center space-x-2 hover:bg-emerald-600 hover:text-white focus:outline-none focus:bg-emerald-600 focus:text-white"
									onClick={() => props.handleSignOut()}
								>
									<AiOutlineLogout />
									<span>Cerrar sesión</span>
								</MenuItem>
							</Menu>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default function HomeOutlet() {
	const [session, setSession] = createSignal<AuthSession | null>(null)
	const navigate = useNavigate()
	createEffect(() => {
		setSession(supabase.auth.session())
		supabase.auth.onAuthStateChange((_event, sess) => {
			if (_event === 'SIGNED_IN') {
				setSession(sess)
			}
			if (_event === 'SIGNED_OUT' || !sess) {
				navigate('/login')
			}
		})
	})
	onMount(() => {
		if (!session()) navigate('/login')
	})

	const handleSignOut = () => {
		supabase.auth.signOut()
	}

	return (
		<>
			<header class="p-5 border-dark-800 border-b-2">
				<nav class="flex flex-row items-center justify-between container mx-auto max-w-5xl font-mulish xl:text-lg text-base">
					<h1>
						<NavLink
							href="/home"
							class="flex flex-row items-center space-x-4 hover:bg-dark-700 duration-100 ease-in-out px-4 py-4 rounded-lg"
							activeClass="text-emerald-300 font-bold"
						>
							<AiFillHome height={300} width={300} />
							<span>{session()?.user?.user_metadata.username}</span>
						</NavLink>
					</h1>
					<ul class="xl:flex lg:flex hidden flex-row items-center space-x-5 ">
						<li>
							<button
								onClick={handleSignOut}
								class="px-6 py-3 rounded-lg  flex flex-row items-center space-x-3  hover:bg-dark-700 duration-100 ease-out"
							>
								<AiOutlineLogout />
								<span>Cerrar sesión</span>
							</button>
						</li>
					</ul>
					<NavMenu handleSignOut={handleSignOut} />
				</nav>
			</header>
			<main class="h-screen">
				<Outlet />
			</main>
		</>
	)
}
