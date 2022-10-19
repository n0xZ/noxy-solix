import { Link } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { Match, Switch } from 'solid-js'
import ProductsList from '~/components/product/ProductsList'
import { getProductsListFromDB } from '~/lib/supabase'

export default function ViewProductLists() {
	const query = createQuery(
		() => ['ProductListsByUserId'],
		async () => await getProductsListFromDB()
	)

	return (
		<section class="h-full  space-y-5 ">
			<section class="flex h-full xl:flex-row  flex-col items-center justify-center text-center">
				<Switch>
					<Match when={query.isLoading}>
						<p>Cargando lista de productos...</p>
					</Match>
					<Match when={query.isError}>
						<p>
							Ha ocurrido un error al cargar tu lista de productos. Por favor, vuelva a
							intentarlo más tarde.
						</p>
					</Match>
					<Match when={query.isSuccess && query.data.data?.length === 0}>
						<p>No tienes ninguna lista de tareas creadas por el momento.</p>
					</Match>
					<Match
						when={query.isSuccess && query.data && query.data.data?.length !== 0}
					>
						<ProductsList productsList={query.data?.data!} />
					</Match>
				</Switch>
			</section>
		</section>
	)
}
