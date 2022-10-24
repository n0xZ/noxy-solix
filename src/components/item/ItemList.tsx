import { For } from 'solid-js'
import { Item } from '~/types'

type Props = {
	items: Item[]
}
export default function ItemList(props: Props) {
	return (
		<article class="grid xl:grid-cols-3 grid-cols-1 gap-6 place-items-center container mx-auto ">
			<For each={props.items}>
				{(prod) => (
					<aside class="h-24 w-72 rounded-md border-2 border-dark-800 flex flex-col flex-wrap justify-center items-center text-center p-2 space-y-2 mt-12">
						<p>{prod.name}</p>
						<div class='flex flex-row items-center space-x-3'>
							<p>$ {prod.price}</p>
							<p>Cantidad: {prod.amount}</p>
						</div>
					</aside>
				)}
			</For>
		</article>
	)
}
