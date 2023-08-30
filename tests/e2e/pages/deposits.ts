import { type Page } from '@playwright/test';

export class DepositsPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto() {
		await this.page.goto('/wilder/staking/deposits');
	}
}
