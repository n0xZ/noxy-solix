import { Link } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { Match, Switch } from 'solid-js'
import { getProductsListFromDB } from '~/lib/supabase'

export default function Invoices() {
	const query = createQuery(
		() => ['ProductListsByUserId'],
		async () => await getProductsListFromDB()
	)

	return (
		<section class="h-screen flex flex-row items-center justify-center space-y-5 ">
			<Switch>
				<Match when={query.isLoading}>
					<p>Cargando...</p>
				</Match>
				<Match when={query.isSuccess && query.data.data?.length === 0}>
					<>
						<p>Al parecer no tienes ninguna lista de productos creada.</p>
						<Link href="/home/list/create">Puedes crearlas haciendo click acá</Link>
					</>
				</Match>
				<Match when={query.isError}>
					<p>
						Ha ocurrido un error al cargar tu lista de productos. Vuelve a intentarlo
						más tarde
					</p>
				</Match>
			</Switch>
		</section>
	)
}
