import { expect, type Page } from '@playwright/test';

export class AccountsOverviewPage {
    constructor(private readonly page: Page) { }

    // Methods

    async clickLogOutLink() {
        await this.logOutLink.click();
    }

    // Assertions

    async expectAccountsOverviewHeadingVisible() {
        await expect(this.accountsOverviewHeading).toBeVisible();
    }

    async expectAccountsOverviewHeadingNotVisible() {
        await expect(this.accountsOverviewHeading).not.toBeVisible();
    }

    async expectLogOutLinkVisible() {
        await expect(this.logOutLink).toBeVisible();
    }

    async expectLogOutLinkNotVisible() {
        await expect(this.logOutLink).not.toBeVisible();
    }

    // Locators

    private get accountsOverviewHeading() {
        return this.page.getByRole('heading', { name: "Accounts Overview" });
    }

    private get logOutLink() {
        return this.page.getByRole('link', { name: 'Log Out' });
    }
}