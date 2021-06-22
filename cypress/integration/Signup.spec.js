/// <reference types="cypress" />

import * as signUp from '../page-objects/Signup';

const { internet } = require('faker');

describe('Signup tests', () => {
  beforeEach(() => {
    cy.visit('/');
    signUp.signUpPage();
  });

  it('Should sign up succesfully', () => {
    const id = Math.floor(Math.random() * 10000);
    const username = `username${id}`;
    signUp.addUsername(username); // internet.userName genera un usuario con fomato xxx.yyy y conduit no acepta ese formato
    signUp.addEmail(internet.exampleEmail());
    signUp.addPassword(internet.password());
    signUp.clickSignUpButton();
    signUp.getLoggedUsername(username);
  });

  it('Sign in an existent user', () => {
    // The user used in this scenario is already created
    signUp.addUsername(Cypress.env('USER_NAME')); // internet.userName genera un usuario con fomato xxx.yyy y conduit no acepta ese formato
    signUp.addEmail(Cypress.env('USER_EMAIL'));
    signUp.addPassword(internet.password());
    signUp.clickSignUpButton();
    signUp.getErrorMessage(1, 'email has already been taken');
    signUp.getErrorMessage(2, 'username has already been taken');
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
    signUp.getUrlAndCompare(Cypress.env('REGISTER_URL'));
  });

  it('Should show password is too short error', () => {
    signUp.addUsername('usertest');
    signUp.addPassword('123');
    signUp.addEmail(internet.exampleEmail());
    signUp.clickSignUpButton();
    signUp.errorMessageLenghtExpected(1);
  });
});
