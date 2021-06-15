/// <reference types="cypress" />

import * as signUp from '../page-objects/Signup';

const { internet } = require('faker');

describe('Signup tests', () => {
  beforeEach(() => {
    cy.visit('https://qa-react-conduit.herokuapp.com/');
    cy.get(':nth-child(3) > .nav-link').click();
  });

  it('Should sign in succesfully', () => {
    const id = Math.floor(Math.random() * 10000);
    const username = `username${id}`;
    signUp.addUsername(username); // internet.userName genera un usuario con fomato xxx.yyy y conduit no acepta ese formato
    signUp.addEmail(internet.exampleEmail());
    signUp.addPassword(internet.password());
    signUp.clickSignUpButton();
    cy.get(':nth-child(4) > .nav-link').should('have.text', username);
  });

  it('Sign in an existant user', () => {
    // The user used in this scenario is already created
    signUp.addUsername('churry'); // internet.userName genera un usuario con fomato xxx.yyy y conduit no acepta ese formato
    signUp.addEmail('alan.reskin@wolox.com.ar');
    signUp.addPassword(internet.password());
    signUp.clickSignUpButton();
    cy.get('.error-messages > :nth-child(1)').should(
      'have.text',
      'email has already been taken'
    );
    cy.get('.error-messages > :nth-child(2)').should(
      'have.text',
      'username has already been taken'
    );
  });

  it('Should show error when click on sign in with all empty fields', () => {
    signUp.clickSignUpButton();
    cy.get('.error-messages li').should('have.length', 3);
  });

  it('Should show email format error', () => {
    signUp.addUsername('usertest');
    signUp.addPassword(internet.password());
    signUp.addEmail('emailsinarroba.com');
    signUp.clickSignUpButton();
    cy.url().should('eq', 'https://qa-react-conduit.herokuapp.com/register');
  });

  it('Should show password is too short error', () => {
    signUp.addUsername('usertest');
    signUp.addPassword('123');
    signUp.addEmail(internet.exampleEmail());
    signUp.clickSignUpButton();
    cy.get('.error-messages > li').should(
      'have.text',
      'password is too short (minimum is 6 characters)'
    );
  });
});
