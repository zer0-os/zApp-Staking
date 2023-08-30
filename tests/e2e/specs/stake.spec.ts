import { test, expect } from '../../../fixtures';
import { PoolsPage } from '../pages/pools';
import { Controls } from '../controls/controls';
import * as metamask from '@synthetixio/synpress/commands/metamask';

test.beforeEach(async ({ page }) => {
	const pools = new PoolsPage(page);
	await pools.goto();
});

test("can't stake without wallet connected", async ({ page }) => {
	await page.getByRole('button', { name: 'Stake' }).first().click();
	await expect(page.getByText(/Connect your wallet/)).toBeVisible();
});

test('can stake tokens', async ({ page }) => {
	test.setTimeout(120000);

	const controls = new Controls(page);
	await controls.connectWallet();

	await page.getByRole('button', { name: 'Stake' }).first().click();
	await page.getByRole('textbox', { name: 'Amount' }).fill('5');
	await page.getByRole('button', { name: /stake/ }).click();
	await metamask.confirmTransaction();
	await expect(page.getByText(/Successfully staked 5/)).toBeVisible({
		timeout: 60000,
	});
});
