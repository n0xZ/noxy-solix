import { For } from 'solid-js'
import { createMutation } from '@tanstack/solid-query'
import { toast } from 'solid-toast'
import { deleteItemOnProductListById } from '~/lib/supabase'
import { Item as ItemI } from '~/types'
import { Item } from './item'

type Props = {
	items: ItemI[]
}

export default function ItemList(props: Props) {
	const { mutate, reset } = createMutation(deleteItemOnProductListById, {
		onSuccess(data) {
			props.items.filter((item) => item.itemId !== data.data?.[0].itemId)

			toast.success('Item borrado con éxito')

			return data
		},
	})
	const deleteItem = (id: number) => mutate(id)
	return (
		<article class="flex flex-col items-center items-center gap-7 container mx-auto  mt-6 p-2">
			<For each={props.items}>
				{(prod) => <Item prod={prod} deleteItem={deleteItem} />}
			</For>
		</article>
	)
}
