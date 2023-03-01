export type ProductList = {
	productListId: string
	title: string
	created_at: Date
	user_Id: string
}

export type Item = {
	itemId?: number
	created_at: Date
	name: string
	amount: number
	price: number
	productListId: string
}
export type FormEvent = Event & { submitter: HTMLElement } & {
	currentTarget: HTMLFormElement
	target: Element
}
