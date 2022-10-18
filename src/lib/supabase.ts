import { createClient } from '@supabase/supabase-js'
import { ProductList } from '~/types'

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL!,
	import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export const getProductsListFromDB = async () => {
	const loggedUser = await supabase.auth.session()
	if (!loggedUser || !loggedUser.user) throw new Error('User not found.')
	return await supabase
		.from<ProductList>('product-list')
		.select('*')
		.eq('user_Id', loggedUser?.user?.id)
}
export const getProductItemsByProductListId = async (productListId: string) => {
	return await supabase
		.from<ProductList>('product-list')
		.select('*')
		.eq('productListId', productListId)
}
