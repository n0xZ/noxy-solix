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
import { createProductList } from '~/lib/supabase'
import { User } from '@supabase/supabase-js'
import { FormEvent } from '~/types'

const createProductValidator = zfd.formData({
	title: z.string().min(3, { message: 'Campo requerido' }),
})

type Props = {
	isOpen: boolean
	closeModal: () => void
	loggedUser: User | null | undefined
	refetchList: () => void
}

export function CreateProductList(props: Props) {
	const [formErrors, setFormErrors] = createSignal<z.ZodError<
		z.infer<typeof createProductValidator>
	> | null>(null)
	const { isLoading, mutate } = createMutation(createProductList, {
		onSuccess(data) {
			toast.success('Lista de productos creada con éxito!')
			props.refetchList()
			props.closeModal()
			return data
		},
	})
	const onSubmit = (e: FormEvent) => {
		const result = createProductValidator.safeParse(new FormData(e.currentTarget))
		e.preventDefault()
		if (!result.success) setFormErrors(result.error)
		else {
			mutate({ title: result.data.title, user_Id: props.loggedUser?.id })
		}
	}

	return (
		<Transition appear show={props.isOpen}>
			<Dialog
				isOpen
				class="fixed inset-0 z-10 overflow-y-auto"
				onClose={props.closeModal}
			>
				<div class="min-h-screen px-4 flex items-center justify-center">
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

					<TransitionChild
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<DialogPanel class="inline-block flex max-w-full xl:w-[30rem] flex-col justify-between items-center  w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-dark-300 text-light-50 shadow-xl rounded-2xl h-full">
							<DialogTitle as="h3" class="text-lg font-medium leading-6 mb-12">
								Crear nueva lista de productos
							</DialogTitle>
							<form
								class="flex flex-col justify-center items-center  w-full"
								onSubmit={onSubmit}
							>
								<FormField
									label="Titulo de la lista de compras"
									placeholder="Mi nuevo titulo de la lista de compras"
									name="title"
									type="text"
									disabled={isLoading}
									errors={
										formErrors()?.formErrors.fieldErrors.title &&
										formErrors()?.formErrors.fieldErrors.title?.[0]
									}
								/>

								<div class="mt-4 flex flex-row items-center space-x-4 w-full">
									<button
										type="submit"
										class="font-bold w-1/2  text-light-500 rounded-lg bg-emerald-500 px-2 py-3 text-base"
										disabled={isLoading}
									>
										{isLoading ? 'Creando lista...' : 'Crear lista'}
									</button>
									<button
										type="button"
										class="inline-flex justify-center  w-1/2 px-2 py-3 text-base font-medium  bg-dark-100 border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
