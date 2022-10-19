import { Title } from '@solidjs/meta'
import { Link } from '@solidjs/router'
import { ApiError } from '@supabase/supabase-js'
import { createSignal, Show } from 'solid-js'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { FormField } from '~/components/form/FormField'
import { supabase } from '~/lib/supabase'

const loginSchema = zfd.formData({
	username: z.string().min(5, { message: 'Campo requerido' }),
	email: z
		.string()
		.min(5, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})
type FormEvent = Event & { submitter: HTMLElement } & {
	currentTarget: HTMLFormElement
	target: Element
}
type LoginFields = z.infer<typeof loginSchema>
type Errors = {
	authErrors: ApiError | null
	fieldErrors: z.ZodError<LoginFields> | null
}

export default function Register() {
	const [errors, setErrors] = createSignal<Errors>({} as Errors)
	const [needsEmailConfirm, setNeedsEmailConfirm] = createSignal(false)
	const [isSubmitting, setIsSubmitting] = createSignal(false)
	const onSubmit = async (e: FormEvent) => {
		const result = loginSchema.safeParse(new FormData(e.currentTarget))
		setIsSubmitting(true)
		e.preventDefault()

		if (!result.success) {
			setErrors((prev) => ({ ...prev, fieldErrors: result.error }))
			setIsSubmitting(false)
		} else {
			const { user, error } = await supabase.auth.signUp(
				{
					email: result.data.email,
					password: result.data.password,
				},
				{
					data: {
						username: result.data.username,
					},
				}
			)
			if (error) {
				setIsSubmitting(false)
				setErrors((prev) => ({ ...prev, authErrors: error }))
			} else if (user) {
				setIsSubmitting(false)
				setNeedsEmailConfirm(true)
			}
		}
	}

	return (
		<section class="h-screen  ">
			<Title>Solyx - Unete ya!</Title>
			<article class="grid place-items-center  w-full h-full">
				<Show
					when={!needsEmailConfirm()}
					fallback={
						<div data-test-id="register-result">
							Por favor, revise su correo para verificar su cuenta.
						</div>
					}
				>
					<form
						onSubmit={onSubmit}
						class=" p-20 flex flex-col items-center justify-center items-center w-full   xl:max-w-2xl lg:max-w-lg md:max-w-lg container mx-auto space-y-5 h-full"
					>
						<h2 class="text-center xl:text-3xl text-lg font-bold mb-3">
							Unete ya a Solyx!
						</h2>
						<FormField
							label="Nombre de usuario"
							type="text"
							name="username"
							placeholder="gonzalo123121"
							data-test-id="username-input"
							errors_data_test_id="username-errors"
							disabled={isSubmitting()}
							errors={
								errors()?.fieldErrors?.formErrors.fieldErrors.username &&
								errors()?.fieldErrors?.formErrors.fieldErrors.username?.[0]
							}
						/>
						<FormField
							label="Correo electrónico"
							type="email"
							name="email"
							placeholder="o.gonzalo1232131@miemail.com"
							data-test-id="email-input"
							errors_data_test_id="email-errors"
							disabled={isSubmitting()}
							errors={
								errors()?.fieldErrors?.formErrors.fieldErrors.email &&
								errors()?.fieldErrors?.formErrors.fieldErrors.email?.[0]
							}
						/>
						<FormField
							label="Contraseña"
							type="password"
							name="password"
							placeholder="gonzalo12313*"
							data-test-id="password-input"
							errors_data_test_id="password-errors"
							disabled={isSubmitting()}
							errors={
								errors()?.fieldErrors?.formErrors.fieldErrors.password &&
								errors()?.fieldErrors?.formErrors.fieldErrors.password?.[0]
							}
						/>
						<button
							class={`px-8 py-4 ${
								isSubmitting() ? 'bg-emerald-600' : 'bg-emerald-400'
							} font-bold w-full  text-light-900 rounded-lg max-w-2xl`}
							type="submit"
							data-test-id="submit-register"
							disabled={isSubmitting()}
						>
							{isSubmitting() ? 'Creando cuenta...' : 'Crear cuenta'}
						</button>

						<span class="h-6 text-red-500">
							<Show when={errors().authErrors}>{errors().authErrors?.message}</Show>
						</span>

						<Link href="/login" class="text-center">
							Ya tengo una cuenta
						</Link>
					</form>
				</Show>
			</article>
		</section>
	)
}
