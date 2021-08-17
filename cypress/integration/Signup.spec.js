/// <reference types="cypress" />

import { SignUp } from '../page-objects/Signup';

const { internet } = require('faker');

describe('Signup tests', () => {
  const signUp = new SignUp();

  beforeEach(() => {
    cy.visit('/');
    signUp.signUpPage();
  });

  it('Should sign up succesfully', () => {
    const id = Math.floor(Math.random() * 10000);
    const username = `username${id}`;
    /* internet.userName generates an user with the format xxx.yyy and conduit
    doesn't allow that format*/
    signUp.addUsername(username);
    signUp.addEmail(internet.exampleEmail());
    signUp.addPassword(internet.password());
    signUp.clickSignUpButton();
    signUp.getLoggedUsername(username);
  });

  it('Sign in an existent user', () => {
    // The user used in this scenario is already created
    /* internet.userName generates an user with the format xxx.yyy and conduit
    doesn't allow that format*/
    signUp.addUsername(Cypress.env('USER_NAME'));
    signUp.addEmail(Cypress.env('USER_EMAIL'));
    signUp.addPassword(internet.password());
    signUp.clickSignUpButton();
    signUp.emailErrorMessage(1);
    signUp.usernameErrorMessage(2);
  });

  it('Should show error when click on sign in with all empty fields', () => {
    signUp.clickSignUpButton();
    signUp.errorMessageLenghtExpected(3);
  });

  it('Should show email format error', () => {
    signUp.addUsername('usertest');
    signUp.addPassword(internet.password());
    signUp.addEmail('emailsinarroba.com');
    signUp.clickSignUpButton();
    signUp.getSignUpUrlAndCompare();
  });

  it('Should show password is too short error', () => {
    signUp.addUsername('usertest');
    signUp.addPassword('123');
    signUp.addEmail(internet.exampleEmail());
    signUp.clickSignUpButton();
    signUp.errorMessageLenghtExpected(1);
  });
});
