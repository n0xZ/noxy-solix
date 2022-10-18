import { createClient } from '@supabase/supabase-js'
import { Invoice, Item } from '~/types'

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL!,
	import.meta.env.VITE_SUPABASE_ANON_KEY!
)

type DatabaseFields = 'invoice' | 'item'
type SelectedRow<T = DatabaseFields> = T extends 'invoice' ? Invoice : Item

export const getFromDB = async (field: DatabaseFields) => {
	return await supabase.from<SelectedRow<typeof field>>(field).select()
}
