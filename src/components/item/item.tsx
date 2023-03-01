import { Item as ItemI } from '~/types'

type Props = {
	prod: ItemI
	deleteItem: (id: number) => void
}
const DeleteIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			class="h-6 w-6"
		>
			<path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z" />
			<path
				fill="currentColor"
				d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"
			/>
		</svg>
	)
}

export function Item(props: Props) {
	return (
		<aside class="h-40 w-full  flex flex-col justify-between max-w-xl  rounded-md bg-dark-800 flex flex-row  text-center  p-6">
			<div class="flex flex-row items-center justify-between">
				<h3 class=" text-xl font-medium">{props.prod.name}</h3>
				<button title='Eliminar item' type="button" onClick={() => props.deleteItem(props.prod.itemId!)}>
					<DeleteIcon />
				</button>
			</div>
			<div class="flex flex-row items-center justify-between ">
				<p>${props.prod.price}</p>
				<p>Cantidad: {props.prod.amount}</p>
			</div>
		</aside>
	)
}
