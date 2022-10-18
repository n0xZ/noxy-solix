import { Link, useNavigate } from '@solidjs/router'
import { ApiError } from '@supabase/supabase-js'
import { createSignal } from 'solid-js'
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
	authErrors: ApiError | null
	fieldErrors: z.ZodError<LoginFields> | null
}

export default function Login() {
	const [errors, setErrors] = createSignal<Errors>({} as Errors)
	const navigate = useNavigate()
	const onSubmit = async (e: FormEvent) => {
		const result = loginSchema.safeParse(new FormData(e.currentTarget))
		e.preventDefault()

		if (!result.success)
			setErrors((prev) => ({ ...prev, fieldErrors: result.error }))
		else {
			const { user, error } = await supabase.auth.signIn({
				email: result.data.email,
				password: result.data.password,
			})
			if (error) setErrors((prev) => ({ ...prev, authErrors: error }))
			else if (user) navigate('/home')
		}
	}

	return (
		<section class="h-screen  ">
			<article class="grid place-items-center  w-full h-full">
				<form
					onSubmit={onSubmit}
					class=" blur-sm p-20 flex flex-col items-center justify-center items-center w-full sm:w-2  xl:max-w-2xl lg:max-w-lg md:max-w-lg container mx-auto space-y-4 "
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
						class="px-8 py-4 bg-emerald-400 font-bold w-full ¿ text-light-50 rounded-lg max-w-2xl"
						type="submit"
						data-test-id="submit-login"
					>
						Iniciar sesión
					</button>

					<span class="h-6 text-red-500" data-test-id="auth-errors">
						{errors().authErrors && errors().authErrors?.message}
					</span>

					<Link href="/register" class="text-center">
						No tengo una cuenta
					</Link>
				</form>
			</article>
		</section>
	)
}
