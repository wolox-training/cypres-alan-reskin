/// <reference types="cypress" />

import { ABMArticles } from '../page-objects/ABMArticles';
import { Profile } from '../page-objects/Profile';

describe('Profile tests', () => {
  const profile = new Profile();
  const articles = new ABMArticles();

  beforeEach(() => {
    cy.visit('/');
    cy.loginAutomationUser();
    articles.interceptGetArticles();
    cy.wait('@getArticles');
  });

  it('Change the username', () => {
    profile.visitEditProfile();
    profile.editUsername('ChurryEditado');
    profile.checkUsername('ChurryEditado');
    //Taking original username back
    profile.visitEditProfile();
    profile.editUsername(Cypress.env('USER_NAME'));
  });

  it('Change the email', () => {
    profile.visitEditProfile();
    profile.editEmail('custom@email.com');
    profile.checkEmail('custom@email.com');
    //Taking original username back
    profile.editEmail(Cypress.env('USER_EMAIL'));
  });

  it('Change password', () => {
    const randomPassword = '123456';
    profile.visitEditProfile();
    profile.editPassword(randomPassword);
    cy.logOut();
    cy.loginCustomUser(Cypress.env('USER_EMAIL'), randomPassword);
    profile.checkUsername(Cypress.env('USER_NAME'));
    //Taking original password back
    profile.visitEditProfile();
    profile.editPassword(Cypress.env('USER_PASSWORD'));
  });

  it('email empty', () => {
    profile.visitEditProfile();
    profile.editEmail('{backspace}');
    profile.getEmailBlankError();
  });

  it('username empty', () => {
    profile.visitEditProfile();
    profile.editUsername('{backspace}');
    profile.getUsernameBlankError();
  });

  it('password too short', () => {
    profile.visitEditProfile();
    profile.editPassword('123');
    profile.getPasswordShortError();
  });
});
