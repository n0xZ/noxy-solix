import { createSignal, lazy, Match, Switch } from 'solid-js'
import { Link, useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { BsCartCheck } from 'solid-icons/bs'
import { AiOutlineRollback } from 'solid-icons/ai'

import ItemList from '~/components/item/ItemList'

import {
	getProductItemsByProductListId,
	getProductListsById,
} from '~/lib/supabase'
import { ItemListSkeleton } from '~/components/item/item-list-skeleton'
import { Title } from '@solidjs/meta'

const CreateProductItem = lazy(
	() => import('~/components/item/CreateProductItem')
)
export default function ProductItemsByProductListId() {
	const params = useParams()
	const itemsQuery = createQuery(
		() => ['product-items-by-productListId'],
		async () => await getProductItemsByProductListId(params.productListId)
	)
	const listQuery = createQuery(
		() => ['product-list-by-id'],
		async () => await getProductListsById(params.productListId)
	)
	const totalPrice = () =>
		itemsQuery.data?.data
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
		itemsQuery.refetch()
	}
	return (
		<section class="h-screen">
			<Title>
				Noxy - Solix | Lista: {listQuery.data && listQuery.data?.data?.[0].title}
			</Title>
			<aside class="w-full p-5 border-b-2 border-dark-800  ">
				<div class=" flex flex-row items-center justify-between container mx-auto max-w-5xl">
					<Link href="/home" class="flex flex-row items-center space-x-3">
						<AiOutlineRollback />
						<span>Volver atrás</span>
					</Link>
					<button class="flex flex-row items-center space-x-3" onClick={openModal}>
						<BsCartCheck />
						<span> Agregar item</span>
					</button>
				</div>
			</aside>
			<CreateProductItem
				productListId={params.productListId}
				isOpen={isOpen()}
				closeModal={closeModal}
				refetchItems={refetchItems}
			/>

			<section class="h-full">
				<h2 class="text-center xl:text-2xl text-lg mt-4 font-bold">
					{!itemsQuery.isLoading ? (
						<>
							{listQuery.data && listQuery.data?.data?.[0].title} (${totalPrice()})
						</>
					) : (
						'Cargando productos. Por favor espere...'
					)}
				</h2>
				<Switch>
					<Match when={itemsQuery.isLoading}>
						<ItemListSkeleton />
					</Match>
					<Match when={itemsQuery.isError}>
						<p>
							Ha ocurrido un error al cargar los items de tu lista. Por favor, vuelva a
							intentarlo más tarde.
						</p>
					</Match>
					<Match when={itemsQuery.isSuccess && itemsQuery.data.data?.length === 0}>
						<p>No hay ningún item en esta lista actual.</p>
					</Match>
					<Match
						when={
							itemsQuery.isSuccess &&
							itemsQuery.data &&
							itemsQuery.data.data?.length !== 0
						}
					>
						<>
							<ItemList items={itemsQuery.data?.data!} />
						</>
					</Match>
				</Switch>
			</section>
		</section>
	)
}
