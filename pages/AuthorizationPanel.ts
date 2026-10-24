import { expect, type Page } from '@playwright/test';

export class AuthorizationPanel { 

    private readonly title: string = 'ParaBank | Welcome | Online Banking';

    constructor(private readonly page: Page) { }

    // Methods

    async goTo() {
        await this.page.goto('/parabank/index.htm');
    }

    async logIn(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.logInButton.click();
    }

    async clickLogInButton() {
        await this.logInButton.click();
    }
    
    async clickLogOutLink() {
        await this.logOutLink.click();
    }

    // Assertions

    async expectTitle() {
        await expect(this.page).toHaveTitle(this.title);
    }

    async expectCustomerLoginHeadingVisible() {
        await expect(this.customerLoginHeading).toBeVisible();
    }

    async expectUsernameInputVisible() {
        await expect(this.usernameInput).toBeVisible();
    }

    async expectPasswordInputVisible() {
        await expect(this.passwordInput).toBeVisible();
    }

    async expectLogInButtonVisible() {
        await expect(this.logInButton).toBeVisible();
    }

    async expectLogOutLinkVisible() {
        await expect(this.logOutLink).toBeVisible();
    }

    async expectLogOutLinkNotVisible() {
        await expect(this.logOutLink).not.toBeVisible();
    }

    async expectUsernameInputValue(value: string) {
        await expect(this.usernameInput).toHaveValue(value);
    }

    async expectErrorHeadingVisible() {
        await expect(this.errorHeading).toBeVisible();
    }

    async expectErrorMessage(text: string) {
        await expect(this.errorMessage).toHaveText(text);
    }

    // Getters

    private get usernameInput() {
        return this.page.locator('input[name="username"]');
    }

    private get passwordInput() {
        return this.page.locator('input[name="password"]');
    }

    private get logInButton() {
        return this.page.getByRole('button', { name: 'Log In' });
    }

    private get logOutLink() {
        return this.page.getByRole('link', { name: 'Log Out' });
    }

    private get customerLoginHeading() {
        return this.page.getByRole('heading', { name: "Customer Login" });
    }

    private get errorHeading() {
        return this.page.getByRole('heading', { name: 'Error!' });
    }

    private get errorMessage() {
        return this.page.locator('p.error');
    }
}
