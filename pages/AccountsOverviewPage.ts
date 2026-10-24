import { expect, type Page } from '@playwright/test';

export class AccountsOverviewPage {
    constructor(private readonly page: Page) { }

    // Assertions

    async expectAccountsOverviewHeadingVisible() {
        await expect(this.accountsOverviewHeading).toBeVisible();
    }

    async expectAccountsOverviewHeadingNotVisible() {
        await expect(this.accountsOverviewHeading).not.toBeVisible();
    }

    // Locators

    private get accountsOverviewHeading() {
        return this.page.getByRole('heading', { name: "Accounts Overview" });
    }
}