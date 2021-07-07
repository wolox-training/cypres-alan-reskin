/// <reference types="cypress" />

export class Profile {
  visitEditProfile() {
    cy.get(':nth-child(3) > .nav-link').click();
  }

  editUsername(newName) {
    cy.get(':nth-child(2) > .form-control').clear().type(newName);
    cy.get('form > :nth-child(1) > .btn').click();
  }

  checkUsername(username) {
    cy.get(':nth-child(4) > .nav-link').should('have.text', username);
  }

  editPassword(newPassword) {
    cy.get(':nth-child(5) > .form-control').clear().type(newPassword);
    cy.get('form > :nth-child(1) > .btn').click();
    cy.wait(2000);
  }

  editEmail(newEmail) {
    cy.get(':nth-child(4) > .form-control').clear().type(newEmail);
    cy.get('form > :nth-child(1) > .btn').click();
    cy.wait(2000);
  }

  checkEmail(email) {
    this.visitEditProfile();
    cy.get(':nth-child(4) > .form-control').should('have.value', email);
  }

  getEmailBlankError() {
    cy.get('.error-messages > li').should('have.text', "email can't be blank");
  }

  getUsernameBlankError() {
    cy.get('.error-messages > li').should(
      'have.text',
      "username is invalidcan't be blank"
    );
  }

  getPasswordShortError() {
    cy.get('.error-messages > li').should(
      'have.text',
      'password is too short (minimum is 6 characters)'
    );
  }

  getProfileFromFeed(username) {
    cy.get('.col-md-9').contains(username).click();
  }
}
