import { Title } from '@solidjs/meta'
import { AuthSession } from '@supabase/supabase-js'

import { createQuery } from '@tanstack/solid-query'
import { createSignal, Match, onMount, Switch } from 'solid-js'
import { CreateProductList } from '~/components/product/CreateProductList'
import { ProductListSkeleton } from '~/components/product/product-list-skeleton'
import ProductsList from '~/components/product/ProductsList'
import { getProductsListFromDB, supabase } from '~/lib/supabase'

export default function Home() {
	const query = createQuery(
		() => ['product-list-by-userId'],
		async () => await getProductsListFromDB()
	)
	const [existingSession, setExistingSession] = createSignal<AuthSession | null>(
		null
	)
	const [isOpen, setIsOpen] = createSignal(false)
	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}
	const refetchList = () => {
		query.refetch()
	}
	onMount(() => setExistingSession(supabase.auth.session()))
	return (
		<section class="h-full  space-y-5 ">
			<Title>Solyx - Lista de productos</Title>
			<aside class="w-full max-w-5xl container mx-auto p-5 border-b-2 border-dark-800  ">
				<div class="container mx-auto flex flex-row items-center justify-end">
					<button onClick={openModal}>Crear nueva lista</button>
				</div>
			</aside>
			<CreateProductList
				loggedUser={existingSession()?.user}
				refetchList={refetchList}
				isOpen={isOpen()}
				closeModal={closeModal}
			/>
			<section class="  w-full h-full text-center mt-4">
				<Switch>
					<Match when={query.isLoading}>
						<>
							<h2 class="text-center mt-3 mb-3 text-3xl font-bold">
								Cargando lista de productos..
							</h2>
							<ProductListSkeleton />
						</>
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
						<>
							<h2 class="text-center mt-3 mb-3 text-3xl font-bold">
								Lista de productos
							</h2>
							<ProductsList productsList={query.data?.data!} />
						</>
					</Match>
				</Switch>
			</section>
		</section>
	)
}
