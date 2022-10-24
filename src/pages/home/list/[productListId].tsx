import { Link, useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { createSignal, Match, Switch } from 'solid-js'
import CreateProductItem from '~/components/item/CreateProductItem'
import ItemList from '~/components/item/ItemList'

import { getProductItemsByProductListId } from '~/lib/supabase'

export default function ProductItemsByProductListId() {
	const params = useParams()
	const query = createQuery(
		() => ['ProductListsByUserId'],
		async () => await getProductItemsByProductListId(params.productListId)
	)
	const totalPrice = () =>
		query.data?.data
			?.map(({ price, amount }) => price * amount)
			.reduce((prev, init) => prev + init)
	const [isOpen, setIsOpen] = createSignal(false)
	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}
	const refetchItems = () => {
		query.refetch()
	}
	return (
		<section class="h-screen">
			<aside class="w-full p-5 border-b-2 border-dark-800  container mx-auto flex flex-row items-center justify-between">
				<Link href="/home/list">Volver atrás</Link>

				<button onClick={openModal}>Agregar item</button>
			</aside>
			<CreateProductItem
				productListId={params.productListId}
				isOpen={isOpen()}
				closeModal={closeModal}
				refetchItems={refetchItems}
			/>
			<section>
				<Switch>
					<Match when={query.isLoading}>
						<p>Cargando items de la lista de productos...</p>
					</Match>
					<Match when={query.isError}>
						<p>
							Ha ocurrido un error al cargar los items de tu lista. Por favor, vuelva a
							intentarlo más tarde.
						</p>
					</Match>
					<Match when={query.isSuccess && query.data.data?.length === 0}>
						<p>No hay ningún item en esta lista actual.</p>
					</Match>
					<Match
						when={query.isSuccess && query.data && query.data.data?.length !== 0}
					>
						<>
							<ItemList items={query.data?.data!} />
							<p class="mt-6 text-center font-bold">
								Precio final actual: ${totalPrice()}
							</p>
						</>
					</Match>
				</Switch>
			</section>
		</section>
	)
}
