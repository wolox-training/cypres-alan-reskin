/// <reference types="cypress" />

export class Favorites {
  markAsFavourite(articlePosition) {
    return cy
      .get(
        `:nth-child(${articlePosition}) > .article-meta > .pull-xs-right > .btn`
      )
      .click();
  }

  checkRequestStatusCode(httpStatus) {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.get('@favoritePost').its('response.statusCode').should('eq', httpStatus);
  }

  goToMyFavoritesArticles() {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.intercept('GET', '/api/articles*').as('favoritedArticles');
    cy.get(':nth-child(4) > .nav-link').click();
    cy.wait('@favoritedArticles');
    cy.get('.articles-toggle > .nav > :nth-child(2) > .nav-link').click();
    cy.wait('@favoritedArticles');
  }

  MarkAndCheckFavoriteCount(articlePosition) {
    cy.get(
      `:nth-child(${articlePosition}) > .article-meta > .pull-xs-right > .btn`
    ).then((fav) => {
      const initialFavCount = parseInt(fav.text());

      this.markAsFavourite(articlePosition)
        .wait(1000)
        .then((fav) => {
          cy.wait('@favoritePost');
          const UpdatedFavCount = parseInt(fav.text());
          expect(UpdatedFavCount).to.be.greaterThan(initialFavCount);
          // Discard favorite
          this.markAsFavourite(articlePosition);
        });
    });
  }

  checkArticleInFavorites(articlePosition) {
    cy.get(`:nth-child(${articlePosition}) > .preview-link > h1`).then(
      (article) => {
        const articleName = article.text();
        this.goToMyFavoritesArticles();
        cy.get(':nth-child(1) > .preview-link > h1').should(
          'have.text',
          articleName
        );
        this.markAsFavourite(1);
      }
    );
  }

  checkNoFavorites() {
    cy.get('.article-preview').should(
      'have.text',
      'No articles are here... yet.'
    );
  }

  goToOthersFavoritesArticles() {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.intercept('GET', '/api/articles*').as('favoritedArticles');
    cy.get('.articles-toggle > .nav > :nth-child(2) > .nav-link').click();
    cy.wait('@favoritedArticles');
  }
}
