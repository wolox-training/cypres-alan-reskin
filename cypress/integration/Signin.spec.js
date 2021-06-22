/// <reference types="cypress" />

import * as signIn from '../page-objects/Signin';

describe('SignIn tests', () => {
  beforeEach(() => {
    cy.visit('/');
    signIn.enterSignInPage();
  });

  it('Signin with empty fields', () => {
    signIn.clickSignInButton();
    signIn.errorMessageLenghtExpected(1);
    signIn.invalidEmailOrPassword();
  });

  it('Signin with wrong email and password', () => {
    signIn.addEmail('thismail@doesnotexist.com');
    signIn.addPassword('thispasswordeither');
    signIn.clickSignInButton();
    signIn.invalidEmailOrPassword();
  });

  it('Signin with wrong email', () => {
    signIn.addEmail('thismail@doesnotexist.com');
    signIn.addPassword(Cypress.env('USER_PASSWORD'));
    signIn.clickSignInButton();
    signIn.invalidEmailOrPassword();
  });

  it('Signin with valid credentials', () => {
    signIn.addEmail(Cypress.env('USER_EMAIL'));
    signIn.addPassword(Cypress.env('USER_PASSWORD'));
    signIn.clickSignInButton();
  });
});
