import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
	DialogOverlay,
} from 'solid-headless'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { FormField } from '../form/FormField'
import { createSignal } from 'solid-js'
import { createMutation } from '@tanstack/solid-query'
import { toast } from 'solid-toast'
import { createItemsOnProductList } from '~/lib/supabase'

import { FormEvent, Item } from '~/types'

export const createProductItemValidator = zfd.formData({
	name: z.string().min(3, { message: 'Campo requerido' }),
	price: zfd.numeric(),
	amount: zfd.numeric(),
})
type FormFields = z.infer<typeof createProductItemValidator>
type Errors = z.ZodError<FormFields>

type Props = {
	productListId: string
	isOpen: boolean
	closeModal: () => void
	refetchItems: () => void
}
export default function CreateProductItem(props: Props) {
	const [errors, setErrors] = createSignal<Errors | null>(null)
	const mutation = createMutation(createItemsOnProductList, {
		async onSuccess(data) {
			toast.success('Item agregado a la lista!')
			props.refetchItems()
			props.closeModal()
			return data
		},
	})
	const handleSubmit = (e: FormEvent) => {
		const result = createProductItemValidator.safeParse(
			new FormData(e.currentTarget)
		)
		e.preventDefault()
		if (!result.success) setErrors(result.error)
		else {
			const newItem: Item = {
				...result.data,
				productListId: props.productListId,
				created_at: new Date(),
			}
			mutation.mutate(newItem)
		}
	}
	return (
		<Transition appear show={props.isOpen}>
			<Dialog
				isOpen
				class="fixed inset-0 z-10 overflow-y-auto"
				onClose={props.closeModal}
			>
				<div class="min-h-screen px-4 flex items-center justify-center w-full">
					<TransitionChild
						enter="ease-out duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<DialogOverlay class="fixed inset-0 bg-dark-800 bg-opacity-50" />
					</TransitionChild>

					<span class="inline-block h-screen align-middle" aria-hidden="true"></span>
					<TransitionChild
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<DialogPanel class="inline-block w-full h-full  flex flex-col justify-between items-center p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-dark-300 text-light-50 shadow-xl rounded-2xl 	">
							<DialogTitle as="h3" class="text-lg font-medium leading-6 mb-12">
								Agregar item a la lista de productos
							</DialogTitle>
							<form
								class="flex flex-col justify-center items-center"
								onSubmit={handleSubmit}
							>
								<FormField
									name="name"
									errors={
										errors()?.formErrors.fieldErrors.name &&
										errors()?.formErrors.fieldErrors.name?.[0]
									}
									placeholder="Galletitas de agua marca ..."
									label="Nombre del producto"
								/>
								<FormField
									name="price"
									type="number"
									errors={
										errors()?.formErrors.fieldErrors.price &&
										errors()?.formErrors.fieldErrors.price?.[0]
									}
									placeholder="130"
									label="Precio del producto"
								/>
								<FormField
									name="amount"
									type="number"
									errors={
										errors()?.formErrors.fieldErrors.amount &&
										errors()?.formErrors.fieldErrors.amount?.[0]
									}
									placeholder="5"
									label="Cantidad"
								/>
								<div class="mt-4 flex flex-row items-center space-x-4 w-full">
									<button
										type="submit"
										class="font-bold w-full  text-light-500 rounded-lg max-w-2xl bg-emerald-500 px-2 py-3 text-base"
										disabled={mutation.isLoading}
									>
										{mutation.isLoading
											? 'Agregando...'
											: 'Agregar item a la lista actual'}
									</button>
									<button
										type="button"
										class="inline-flex justify-center px-4 py-2 text-sm font-medium  bg-dark-100 border border-transparent rounded-md hover:bg-dark-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={props.closeModal}
									>
										Cerrar formulario
									</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	)
}
