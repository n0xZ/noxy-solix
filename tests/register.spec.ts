import { expect, test } from '@playwright/test'

test.describe('Register page integration test', () => {
	test('Should display errors when every field is empty', async ({ page }) => {
		await page.goto('./register')
		await page.locator('data-test-id=submit-register').click()
		await expect(page.locator('data-test-id=email-errors')).toHaveText(
			'Campo requerido'
		)
		await expect(page.locator('data-test-id=password-errors')).toHaveText(
			'Campo requerido'
		)
	})
})
