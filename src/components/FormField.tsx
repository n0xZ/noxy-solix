import { JSX, Show, splitProps } from 'solid-js'
interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label: string
	errors?: string
	errors_data_test_id?: string
}
export function FormField(props: Props) {
	const [selectedProps, rest] = splitProps(props, [
		'errors',
		'errors_data_test_id',
		'label',
	])
	return (
		<aside class="flex flex-col justify-center w-full xl:max-w-2xl lg:max-w-lg md:max-w-lg">
			<label html-for="email">{selectedProps.label}</label>
			<input {...rest}  class="rounded-lg text-dark-900 py-3"/>
			<span
				data-test-id={selectedProps.errors_data_test_id}
				class="h-6 text-red-500"
			>
				<Show when={selectedProps.errors}>{selectedProps.errors}</Show>
			</span>
		</aside>
	)
}
