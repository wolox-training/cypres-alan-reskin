/// <reference types="cypress" />

export class SignUp {
  addEmail(email) {
    cy.get(':nth-child(2) > .form-control').type(email);
  }
  addUsername(username) {
    cy.get(':nth-child(1) > .form-control').type(username);
  }
  addPassword(password) {
    cy.get(':nth-child(3) > .form-control').type(password);
  }
  clickSignUpButton() {
    cy.get('.btn').click();
  }
  signUpPage() {
    cy.get(':nth-child(3) > .nav-link').click();
  }
  emailErrorMessage(position) {
    cy.get(`.error-messages > :nth-child(${position})`).should(
      'have.text',
      'email has already been taken'
    );
  }
  usernameErrorMessage(position) {
    cy.get(`.error-messages > :nth-child(${position})`).should(
      'have.text',
      'username has already been taken'
    );
  }
  errorMessageLenghtExpected(lenght) {
    cy.get('.error-messages li').should('have.length', lenght);
  }
  getLoggedUsername(username) {
    cy.get(':nth-child(4) > .nav-link').should('have.text', username);
  }

  getSignUpUrlAndCompare() {
    cy.url().should('eq', Cypress.env('REGISTER_URL'));
  }

  apiCreateUser(username, email, password) {
    cy.request({
      method: 'POST',
      url: Cypress.env('HOME_URL') + '/api/users', // baseUrl is prepended to url
      form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        user: {
          username,
          email,
          password,
        },
      },
    }).then((response) => expect(response.status).to.eq(200));
  }
}
