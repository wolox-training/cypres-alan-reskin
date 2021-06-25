/// <reference types="cypress" />

export class SignIn {
  addEmail(email) {
    cy.get(':nth-child(1) > .form-control').type(email);
  }

  addPassword(password) {
    cy.get(':nth-child(2) > .form-control').type(password);
  }
  clickSignInButton() {
    cy.get('.btn').click();
  }
  enterSignInPage() {
    cy.get(':nth-child(2) > .nav-link').click();
  }
  invalidEmailOrPassword() {
    cy.get('.error-messages > li').should(
      'have.text',
      'email or password is invalid'
    );
  }
}
