export type Invoice = {
	invoiceId: string
	month: string
	created_at: Date
	user_id: string
}

export type Item = {
	itemId: string
	created_at: Date
	name: string
	amount: string
	price: string
}
