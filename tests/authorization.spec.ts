import { test } from '../fixtures/test-fixtures';

test('Login form visibility', async ({ authorizationPanel }) => {
  await authorizationPanel.goTo();
  await authorizationPanel.expectTitle();
  await authorizationPanel.expectCustomerLoginHeadingVisible();
  await authorizationPanel.expectUsernameInputVisible();
  await authorizationPanel.expectPasswordInputVisible();
  await authorizationPanel.expectLogInButtonVisible();
});

test('Empty username', async ({ authorizationPanel }) => {
  await authorizationPanel.goTo();
  await authorizationPanel.expectUsernameInputValue('');
  await authorizationPanel.clickLogInButton();
  await authorizationPanel.expectErrorHeadingVisible();
  await authorizationPanel.expectErrorMessage('Please enter a username and password.');
});

test('Login with invalid credentials', async ({ authorizationPanel }) => {
  await authorizationPanel.goTo();
  await authorizationPanel.logIn('invalid', 'invalid');
  await authorizationPanel.expectErrorHeadingVisible();
  await authorizationPanel.expectErrorMessage('The username and password could not be verified.');
  await authorizationPanel.expectLogOutLinkNotVisible();
});

test('Successful login with valid credentials', async ({ 
  authorizationPanel,
  accountsOverviewPage,
 }) => {
  await authorizationPanel.goTo();
  await authorizationPanel.logIn('john', 'demo');
  await authorizationPanel.expectLogOutLinkVisible();
  await accountsOverviewPage.expectAccountsOverviewHeadingVisible();
});

test('Successful logout', async ({ 
  authorizationPanel,
  accountsOverviewPage,
 }) => {
  await authorizationPanel.goTo();
  await authorizationPanel.logIn('john', 'demo');
  await accountsOverviewPage.expectAccountsOverviewHeadingVisible();
  await authorizationPanel.expectLogOutLinkVisible();
  await authorizationPanel.clickLogOutLink();
  await accountsOverviewPage.expectAccountsOverviewHeadingNotVisible();
  await authorizationPanel.expectLogInButtonVisible();
});