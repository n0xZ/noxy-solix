import { NavLink } from '@solidjs/router'

export default function Home() {
	return (
		<>
			<header class="p-5 border-dark-800 border-b-2 ">
				<nav class="flex flex-row items-center justify-between container mx-auto max-w-5xl font-mulish text-lg">
					<h1>
						<NavLink href="/">Solix</NavLink>
					</h1>
					<ul class="flex flex-row items-center space-x-3">
						<li>
							<NavLink href="/login">Iniciar sesión</NavLink>
						</li>
						<li>
							<NavLink href="/register">Unete ya! </NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<main class='h-screen'>
				<section></section>
				<section></section>
			</main>
		</>
	)
}
