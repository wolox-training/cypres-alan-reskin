// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { SignIn } from '../page-objects/Signin';

Cypress.Commands.add('loginUser', (email, password) => {
  const signIn = new SignIn();

  signIn.addEmail(email);
  signIn.addPassword(password);
  signIn.clickSignInButton();
});

Cypress.Commands.add('logOut', () => {
  cy.get(':nth-child(3) > .nav-link').click();
  cy.get('.btn-outline-danger').click();
});
