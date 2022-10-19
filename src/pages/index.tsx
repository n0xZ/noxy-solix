import { Link, NavLink } from '@solidjs/router'
import { JSXElement } from 'solid-js'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
	Menu,
	MenuItem,
} from 'solid-headless'
import { AiOutlineBars } from 'solid-icons/ai'
type LandingLayoutProps = {
	children: JSXElement
}
function classNames(...classes: (string | boolean | undefined)[]): string {
	return classes.filter(Boolean).join(' ')
}
function NavMenu() {
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
								<MenuItem class="text-sm p-1 text-left rounded hover:bg-emerald-600 hover:text-white focus:outline-none focus:bg-emerald-600 focus:text-white">
									<NavLink href="/login/" activeClass="font-bold">
										Iniciar sesión
									</NavLink>
								</MenuItem>

								<MenuItem
									as="button"
									class="text-sm p-1 text-left rounded flex flex-row items-center space-x-2 bg-emerald-600 hover:text-white focus:outline-none focus:bg-emerald-600 focus:text-white"
								>
									Unete ya
								</MenuItem>
							</Menu>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export function LandingLayout(props: LandingLayoutProps) {
	return (
		<>
			<header class="p-5 border-dark-800 border-b-2 ">
				<nav class="flex flex-row items-center justify-between container mx-auto max-w-7xl font-mulish xl:text-lg text-base">
					<h1>
						<NavLink
							href="/"
							class="hover:bg-dark-700 duration-100 ease-in-out px-4 py-4 rounded-lg"
						>
							Solix
						</NavLink>
					</h1>
					<ul class="xl:flex lg:flex hidden flex-row items-center space-x-5  ">
						<li>
							<NavLink
								href="/login"
								class="hover:bg-dark-700 duration-100 ease-in-out px-4 py-4 rounded-lg"
							>
								Iniciar sesión
							</NavLink>
						</li>
						<li>
							<NavLink
								href="/register"
								class="bg-emerald-500 duration-100 ease-in-out px-6 py-3 rounded-lg"
							>
								Unete ya!{' '}
							</NavLink>
						</li>
					</ul>
					<NavMenu />
				</nav>
			</header>
			<main class="h-screen">{props.children}</main>
		</>
	)
}

export default function Home() {
	return (
		<LandingLayout>
			<section class="h-full flex flex-col items-center justify-center container mx-auto space-y-3 text-center">
				<h1 class="xl:text-3xl lg:text-2xl text-2xl font-bold">
					Preparar tu lista de compras nunca fue tan fácil con Solyx
				</h1>
				<Link href="/login" class="bg-emerald-500 duration-100 ease-in-out px-6 py-4 rounded-lg">Comenzar ya</Link>
			</section>
		</LandingLayout>
	)
}
