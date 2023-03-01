import { Link } from '@solidjs/router'
import { ProductList } from '~/types'

type Props = {
	productListItem: ProductList
}

export default function ProductListItem(props: Props) {
	return (
		<Link
			href={`/home/list/${props.productListItem.productListId}`}
			class="h-40 w-full   max-w-xl  rounded-md bg-dark-800 flex flex-row  text-center  p-6"
		>
			<h3 class="text-xl font-bold">{props.productListItem.title}</h3>
		</Link>
	)
}
