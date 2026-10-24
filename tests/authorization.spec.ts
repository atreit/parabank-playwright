import { test } from '@playwright/test';
import { AuthorizationPanel } from '../pages/AuthorizationPanel';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';

test('Login form visibility', async ({ page }) => {
  const authorizationPanel = new AuthorizationPanel(page);

  await authorizationPanel.goTo();
  await authorizationPanel.expectTitle();
  await authorizationPanel.expectCustomerLoginHeadingVisible();
  await authorizationPanel.expectUsernameInputVisible();
  await authorizationPanel.expectPasswordInputVisible();
  await authorizationPanel.expectLogInButtonVisible();
});

test('Empty username', async ({ page }) => {
  const authorizationPanel = new AuthorizationPanel(page);

  await authorizationPanel.goTo();
  await authorizationPanel.expectUsernameInputValue('');
  await authorizationPanel.clickLogInButton();
  await authorizationPanel.expectErrorHeadingVisible();
  await authorizationPanel.expectErrorMessage('Please enter a username and password.');
});

test('Login with invalid credentials', async ({ page }) => {
  const authorizationPanel = new AuthorizationPanel(page);

  await authorizationPanel.goTo();
  await authorizationPanel.logIn('invalid', 'invalid');
  await authorizationPanel.expectErrorHeadingVisible();
  await authorizationPanel.expectErrorMessage('The username and password could not be verified.');
  await authorizationPanel.expectLogOutLinkNotVisible();
});

test('Successful login with valid credentials', async ({ page }) => {
  const authorizationPanel = new AuthorizationPanel(page);

  await authorizationPanel.goTo();
  await authorizationPanel.logIn('john', 'demo');
  await authorizationPanel.expectLogOutLinkVisible();

  const accountsOverviewPage = new AccountsOverviewPage(page);

  await accountsOverviewPage.expectAccountsOverviewHeadingVisible();
});

test('Successful logout', async ({ page }) => {
  const authorizationPanel = new AuthorizationPanel(page);

  await authorizationPanel.goTo();
  await authorizationPanel.logIn('john', 'demo');

  const accountsOverviewPage = new AccountsOverviewPage(page);

  await accountsOverviewPage.expectAccountsOverviewHeadingVisible();
  await authorizationPanel.expectLogOutLinkVisible();
  await authorizationPanel.clickLogOutLink();
  await accountsOverviewPage.expectAccountsOverviewHeadingNotVisible();
  await authorizationPanel.expectLogInButtonVisible();
});