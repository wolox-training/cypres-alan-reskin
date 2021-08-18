/// <reference types="cypress" />

import { SignIn } from '../page-objects/Signin';

describe('SignIn tests', () => {
  const signIn = new SignIn();

  beforeEach(() => {
    cy.visit('/');
    signIn.enterSignInPage();
  });

  it('Signin with empty fields', () => {
    signIn.clickSignInButton();
    signIn.invalidEmailOrPassword();
  });

  it('Signin with wrong email and password', () => {
    cy.loginUser('thismail@doesnotexist.com', 'thispasswordeither');
    signIn.invalidEmailOrPassword();
  });

  it('Signin with wrong email', () => {
    cy.loginUser('thismail@doesnotexist.com', Cypress.env('USER_PASSWORD'));
    signIn.invalidEmailOrPassword();
  });

  it('Signin with valid credentials', () => {
    cy.loginUser(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
    signIn.usernameInNavbarShouldBe(Cypress.env('USER_NAME'));
  });
});
