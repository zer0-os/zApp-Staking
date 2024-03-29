import { test, expect } from '../../../fixtures';
import { Controls } from '../controls/controls';
import { DepositsPage } from '../pages/deposits';
import * as metamask from '@synthetixio/synpress/commands/metamask';

test.beforeEach(async ({ page }) => {
	const pools = new DepositsPage(page);
	await pools.goto();

	const controls = new Controls(page);
	await controls.connectWallet();
});

test('can unstake tokens from a deposit', async ({ page }) => {
	test.setTimeout(120000);

	const deposit = page
		.getByTestId('zapp-staking-deposits-table-deposit')
		.first();

	await deposit.getByRole('button').last().click();
	await page.getByText('Unstake Deposit').click();
	await page.getByRole('button', { name: 'MAX' }).click();
	await page.getByRole('button', { name: /unstake \d/ }).click();
	await page.getByRole('button', { name: 'Confirm Unstake' }).click();
	await metamask.confirmTransaction();
	await page.waitForSelector('[data-testid="zapp-staking-unstake-form"]', {
		state: 'detached',
		timeout: 60000,
	});
});
