import { Link } from '@solidjs/router'
import { ProductList } from '~/types'

type Props = {
	productListItem: ProductList
}

export default function ProductListItem(props: Props) {
	return (
		<Link
			href={`/list/${props.productListItem.productListId}`}
			class="h-24 w-72 rounded-md border-2 border-dark-800 flex flex-row flex-wrap justify-center items-center text-center p-2 space-x-2"
		>
			<p>{props.productListItem.title}</p>
		</Link>
	)
}
