/// <reference types="cypress" />

import { ABMArticles } from '../page-objects/ABMArticles';
import { Comment } from '../page-objects/Comments';
import { Favorites } from '../page-objects/Favorites';

describe('Favorite tests', () => {
  const favorite = new Favorites();
  const articles = new ABMArticles();
  const comments = new Comment();

  beforeEach(() => {
    cy.visit('/');
    cy.loginAutomationUser();
    articles.interceptGetArticles();
    cy.wait('@getArticles');
    comments.getGlobalFeed();
  });

  it('Mark favorite with unloged user ', () => {
    cy.intercept('POST', '/api/articles/*/favorite').as('favoritePost');
    cy.logOut();
    favorite.markAsFavourite(1); //Mark as favorite the first article
    favorite.checkRequestStatusCode(401);
  });

  it('Mark favorite with logged user ', () => {
    cy.intercept('POST', '/api/articles/*/favorite').as('favoritePost');
    favorite.MarkAndCheckFavoriteCount(1);
  });

  it('Check if favorited Article is in favorited articles section', () => {
    cy.intercept('POST', '/api/articles/*/favorite').as('favoritePost');

    favorite.markAsFavourite(1); //Mark as favorite the first article
    favorite.checkArticleInFavorites(1);
  });
});
