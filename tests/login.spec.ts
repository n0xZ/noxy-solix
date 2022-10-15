import { expect, test } from '@playwright/test'

test.describe('Login page integration test', () => {
	test('Should display errors when every field is empty', async ({ page }) => {
		await page.goto('http://127.0.0.1:3000/login')
		await page.locator('data-test-id=submit-login').click()
		await expect(page.locator('data-test-id=email-errors')).toHaveText(
			'Campo requerido'
		)
		await expect(page.locator('data-test-id=password-errors')).toHaveText(
			'Campo requerido'
		)
	})
	test('Should display "Invalid credentials" when user has entered credentials that does not exist ', async ({
		page,
	}) => {
		await page.goto('http://127.0.0.1:3000/login')
		await page
			.locator('data-test-id=email-input')
			.fill('o.gonzalo312331@gmail.com')
		await page.locator('data-test-id=password-input').fill('gonzalo312331')
		await page.locator('data-test-id=submit-login').click()

		await expect(page.locator('data-test-id=auth-errors')).toHaveText(
			'Invalid login credentials'
		)
	})
})
