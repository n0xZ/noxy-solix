import { createClient } from '@supabase/supabase-js'
import { ProductList, Item } from '~/types'

type CreateProductList = {
	title: string
	user_Id?: string
}

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

export const createProductList = async ({
	title,
	user_Id,
}: CreateProductList) => {
	return await supabase.from('product-list').insert({ title, user_Id })
}

export const createItemsOnProductList = async (items: Item[]) => {
	return await supabase.from('item').insert(items)
}
