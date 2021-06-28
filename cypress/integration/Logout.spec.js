/// <reference types="cypress" />

import { ABMArticles } from '../page-objects/ABMArticles';
import { Logout } from '../page-objects/Logout';

describe('Logout test', () => {
  const articles = new ABMArticles();
  const logout = new Logout();
  before(() => {
    cy.visit('/');
    cy.loginAutomationUser();
    articles.interceptGetArticles();
    cy.wait('@getArticles');
  });

  it('should log out', () => {
    cy.logOut();
    logout.checkLogout(Cypress.env('USER_NAME'));
  });
});
