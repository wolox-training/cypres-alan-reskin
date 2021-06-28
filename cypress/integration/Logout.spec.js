/// <reference types="cypress" />

import { ABMArticles } from '../page-objects/ABMArticles';

describe('Logout test', () => {
  const articles = new ABMArticles();

  before(() => {
    cy.visit('/');
    cy.loginAutomationUser();
    articles.interceptGetArticles();
    cy.wait('@getArticles');
  });

  it('should log out', () => {
    cy.logOut();
    cy.get('.container > .nav').should(
      'not.have.text',
      Cypress.env('USER_NAME')
    );
  });
});
