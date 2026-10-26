import { test as base } from '@playwright/test';
import { AuthorizationPanel } from '../pages/AuthorizationPanel';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';

type TextFixtures = {
    authorizationPanel: AuthorizationPanel;
    accountsOverviewPage: AccountsOverviewPage;
};

export const test = base.extend<TextFixtures>({
    authorizationPanel: async ({ page }, use) => {
        const authorizationPanel = new AuthorizationPanel(page);
        await use(authorizationPanel);
    },

    accountsOverviewPage: async ({ page }, use) => {
        const accountsOverviewPage = new AccountsOverviewPage(page);
        await use(accountsOverviewPage);
    }
});