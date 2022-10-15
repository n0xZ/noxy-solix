import { Link, useNavigate } from '@solidjs/router'
import { AuthError } from '@supabase/supabase-js'
import { createSignal, Show } from 'solid-js'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
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

export default function Login() {
	const [errors, setErrors] = createSignal<Errors>({} as Errors)
	const navigate = useNavigate()
	const onSubmit = async (e: FormEvent) => {
		const result = loginSchema.safeParse(new FormData(e.currentTarget))
		e.preventDefault()

		if (!result.success)
			setErrors((prev) => ({ ...prev, fieldErrors: result.error }))
		else {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: result.data.email,
				password: result.data.password,
			})
			if (error) setErrors((prev) => ({ ...prev, authErrors: error }))
			else if (data) navigate('/home')
		}
	}

	return (
		<section class="h-screen  ">
			<article class="grid place-items-center w-full h-full">
				{' '}
				<form
					onSubmit={onSubmit}
					class="flex flex-col justify-center container mx-auto space-y-2 "
				>
					<aside class="flex flex-col justify-center max-w-2xl">
						<label html-for="email">Correo electrónico</label>
						<input
							type="email"
							name="email"
							placeholder="o.gonzalo1031@miemail.com"
							data-test-id="email-input"
						/>
						<span class="h-6 text-red-500" data-test-id="email-errors">
							<Show when={errors()?.fieldErrors?.formErrors.fieldErrors.email}>
								{errors()?.fieldErrors?.formErrors.fieldErrors.email?.[0]}
							</Show>
						</span>
					</aside>
					<aside class="flex flex-col justify-center max-w-2xl">
						<label html-for="password">Contraseña</label>
						<input
							type="password"
							name="password"
							placeholder="gonzalo123*"
							data-test-id="password-input"
						/>
						<span class="h-6 text-red-500" data-test-id="password-errors">
							<Show when={errors()?.fieldErrors?.formErrors.fieldErrors.password}>
								{errors()?.fieldErrors?.formErrors.fieldErrors.password?.[0]}
							</Show>
						</span>
					</aside>
					<button
						class="px-8 py-4 bg-emerald-400 font-bold text-light-50 rounded-lg max-w-2xl"
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
