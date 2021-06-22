/// <reference types="cypress" />

export function addEmail(email) {
  cy.get(':nth-child(1) > .form-control').type(email);
}

export function addPassword(password) {
  cy.get(':nth-child(2) > .form-control').type(password);
}
export function clickSignInButton() {
  cy.get('.btn').click();
}
export function enterSignInPage() {
  cy.get(':nth-child(2) > .nav-link').click();
}

export function errorMessageLenghtExpected(lenght) {
  cy.get('.error-messages li').should('have.length', lenght);
}
export function invalidEmailOrPassword() {
  cy.get('.error-messages > li').should(
    'have.text',
    'email or password is invalid'
  );
}
