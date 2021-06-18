/// <reference types="cypress" />

export function addEmail(email) {
  cy.get(':nth-child(2) > .form-control').type(email);
}
export function addUsername(username) {
  cy.get(':nth-child(1) > .form-control').type(username);
}
export function addPassword(password) {
  cy.get(':nth-child(3) > .form-control').type(password);
}
export function clickSignUpButton() {
  cy.get('.btn').click();
}
export function signUpPage() {
  cy.get(':nth-child(3) > .nav-link').click();
}
export function getErrorMessage(position, message) {
  cy.get(`.error-messages > :nth-child(${position})`).should(
    'have.text',
    message
  );
}
export function errorMessageLenghtExpected(lenght) {
  cy.get('.error-messages li').should('have.length', lenght);
}
export function getLoggedUsername(username) {
  cy.get(':nth-child(4) > .nav-link').should('have.text', username);
}

export function getUrlAndCompare(url) {
  cy.url().should('eq', url);
}
