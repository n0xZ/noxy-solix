import { For } from 'solid-js'
import { ProductList } from '~/types'
import ProductListItem from './ProductListItem'

type Props = {
	productsList: ProductList[]
}
export default function ProductsList(props: Props) {
	return (
		<article class="grid xl:grid-cols-3 grid-cols-1 gap-6 place-items-center container mx-auto ">
			<For each={props.productsList}>
				{(prod) => <ProductListItem productListItem={prod} />}
			</For>
		</article>
	)
}
