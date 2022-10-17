import { Link, useNavigate } from '@solidjs/router'
import { AuthError } from '@supabase/supabase-js'
import { createSignal, Show } from 'solid-js'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { FormField } from '~/components/FormField'
import { supabase } from '~/lib/supabase'

const loginSchema = zfd.formData({
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
	authErrors: AuthError | null
	fieldErrors: z.ZodError<LoginFields> | null
}

export default function Register() {
	const [errors, setErrors] = createSignal<Errors>({} as Errors)
	const [needsEmailConfirm, setNeedsEmailConfirm] = createSignal(false)

	const onSubmit = async (e: FormEvent) => {
		const result = loginSchema.safeParse(new FormData(e.currentTarget))
		e.preventDefault()

		if (!result.success)
			setErrors((prev) => ({ ...prev, fieldErrors: result.error }))
		else {
			const { data, error } = await supabase.auth.signUp({
				email: result.data.email,
				password: result.data.password,
			})
			if (error) setErrors((prev) => ({ ...prev, authErrors: error }))
			else setNeedsEmailConfirm(true)
		}
	}

	return (
		<section class="h-screen  ">
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
						class=" bg-opacity-60 backdrop-blur-lg backdrop-filter bg-dark-800  p-16  flex flex-col items-center justify-center items-center w-full  container mx-auto space-y-4 "
					>
						<FormField
							label="Correo electrónico"
							type="email"
							name="email"
							placeholder="o.gonzalo1232131@miemail.com"
							data-test-id="email-input"
							errors_data_test_id="email-errors"
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
							errors={
								errors()?.fieldErrors?.formErrors.fieldErrors.password &&
								errors()?.fieldErrors?.formErrors.fieldErrors.password?.[0]
							}
						/>
						<button
							class="px-8 py-4 bg-dark-800 font-bold  border-dark-900 w-full min-w-xl max-w-2xl text-light-50 rounded-lg  hover:bg-emerald-600  duration-100 ease-in-out"
							type="submit"
							data-test-id="submit-register"
						>
							Crear cuenta
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
