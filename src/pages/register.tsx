import { Link, useNavigate } from '@solidjs/router'
import { AuthError } from '@supabase/supabase-js'
import { createSignal, Show } from 'solid-js'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { FormField } from '~/components/FormField'
import { supabase } from '~/lib/supabase'

const loginSchema = zfd.formData({
	email: z.string().email({ message: 'Formato de email ingresado no válido' }),
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
			<article class="grid place-items-center w-full h-full">
				<Show
					when={needsEmailConfirm()}
					fallback={<div>Por favor, revise su correo para verificar su cuenta.</div>}
				>
					<form
						onSubmit={onSubmit}
						class="flex flex-col justify-center container mx-auto space-y-2 "
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
							class="px-8 py-4 bg-emerald-400 font-bold text-light-50 rounded-lg max-w-2xl"
							type="submit"
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
