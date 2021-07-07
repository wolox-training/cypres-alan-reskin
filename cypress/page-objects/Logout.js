/// <reference types="cypress" />

export class Logout {
  checkLogout(userName) {
    cy.get('.container > .nav').should('not.have.text', userName);
  }
}
