import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';

test('Login form visibility', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.expectTitle();
  await loginPage.expectCustomerLoginHeadingVisible();
  await loginPage.expectUsernameInputVisible();
  await loginPage.expectPasswordInputVisible();
  await loginPage.expectLogInButtonVisible();
});

test('Empty username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.expectUsernameInputValue('');
  await loginPage.clickLogInButton();
  await loginPage.expectErrorHeadingVisible();
  await loginPage.expectErrorMessage('Please enter a username and password.');
});

test('Login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.logIn('invalid', 'invalid');
  await loginPage.expectErrorHeadingVisible();
  await loginPage.expectErrorMessage('The username and password could not be verified.');

  const accountsOverviewPage = new AccountsOverviewPage(page);

  await accountsOverviewPage.expectLogOutLinkNotVisible();
});

test('Successful login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.logIn('john', 'demo');

  const accountsOverviewPage = new AccountsOverviewPage(page);

  await accountsOverviewPage.expectAccountsOverviewHeadingVisible();
  await accountsOverviewPage.expectLogOutLinkVisible();
});

test('Successful logout', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.logIn('john', 'demo');

  const accountsOverviewPage = new AccountsOverviewPage(page);

  await accountsOverviewPage.expectAccountsOverviewHeadingVisible();
  await accountsOverviewPage.expectLogOutLinkVisible();
  await accountsOverviewPage.clickLogOutLink();
  await accountsOverviewPage.expectAccountsOverviewHeadingNotVisible();

  await loginPage.expectLogInButtonVisible();
});