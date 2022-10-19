import { LandingLayout } from '.'

export default function PageNotFoundOnLanding() {
	return (
		<LandingLayout>
			<section class="h-full grid place-items-center container mx-auto">
				<article class="flex flex-col items-center justify-center ">
					<h1>Ups! Al parecer esta página no existe</h1>
					<p>Por favor, vuelva atrás para continuar su navegación.</p>
				</article>
			</section>
		</LandingLayout>
	)
}
