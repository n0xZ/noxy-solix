import { For } from 'solid-js'
import { ProductList } from '~/types'
import ProductListItem from './ProductListItem'

type Props = {
	productsList: ProductList[]
}
export default function ProductsList(props: Props) {
	return (
		<article class="flex flex-col items-center items-center gap-7 container mx-auto  mt-6">
			<For each={props.productsList}>
				{(prod) => <ProductListItem productListItem={prod} />}
			</For>
		</article>
	)
}
