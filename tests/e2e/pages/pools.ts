import { type Page } from '@playwright/test';

export class PoolsPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto() {
		await this.page.goto('/wilder/staking/pools');
	}
}
