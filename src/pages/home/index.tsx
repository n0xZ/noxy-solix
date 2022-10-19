import { Title } from '@solidjs/meta'
import { AuthSession } from '@supabase/supabase-js'
import { createSignal, onMount } from 'solid-js'
import { supabase } from '~/lib/supabase'

export default function Home() {
	const [existingSession, setExistingSession] = createSignal<AuthSession | null>(
		null
	)
	onMount(() => setExistingSession(supabase.auth.session()))
	return (
		<section>
		<Title>Solyx - Home</Title>
			<article>
				<p>Bienvenid@ {existingSession()?.user?.user_metadata.username}</p>
			</article>
			<article></article>
		</section>
	)
}
