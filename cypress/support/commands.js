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

Cypress.Commands.add('loginAutomationUser', () => {
  cy.get(':nth-child(2) > .nav-link').click();
  cy.get(':nth-child(1) > .form-control').type(Cypress.env('USER_EMAIL'));
  cy.get(':nth-child(2) > .form-control').type(Cypress.env('USER_PASSWORD'));
  cy.get('.btn').click();
});

Cypress.Commands.add('loginCustomUser', (user, password) => {
  cy.get(':nth-child(2) > .nav-link').click();
  cy.get(':nth-child(1) > .form-control').type(user);
  cy.get(':nth-child(2) > .form-control').type(password);
  cy.get('.btn').click();
});

Cypress.Commands.add('logOut', () => {
  cy.get(':nth-child(3) > .nav-link').click();
  cy.get('.btn-outline-danger').click();
});
