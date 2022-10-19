import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
	DialogOverlay,
} from 'solid-headless'
type Props = {
	isOpen: boolean
	closeModal: () => void
}
export function CreateProductList(props: Props) {
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

					{/* This element is to trick the browser into centering the modal contents. */}
					<span class="inline-block h-screen align-middle" aria-hidden="true">
						&#8203;
					</span>
					<TransitionChild
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<DialogPanel class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-dark-300 text-light-50 shadow-xl rounded-2xl h-96">
							<DialogTitle as="h3" class="text-lg font-medium leading-6 ">
								Crear nueva lista de productos
							</DialogTitle>
							<form >
              
              </form>

							<div class="mt-4">
								<button
									type="button"
									class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									onClick={props.closeModal}
								>
									Got it, thanks!
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	)
}
