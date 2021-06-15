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
