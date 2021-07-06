/// <reference types="cypress" />

export class ABMArticles {
  newPost(articleTitle, articleAbout, articleDesc, tags) {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.get(':nth-child(1) > .form-control').type(articleTitle);
    cy.get(':nth-child(2) > .form-control').type(articleAbout);
    cy.get(':nth-child(3) > .form-control').type(articleDesc);
    cy.get(':nth-child(4) > .form-control').type(tags);
    cy.get('.btn').click();
    cy.wait('@createArticle');
  }
  editPost() {
    cy.get(':nth-child(1) > .preview-link > h1').click();
    cy.get('.btn-outline-secondary').click();
    cy.wait(2000);
    cy.get(':nth-child(1) > .form-control').clear().type('editado');
    cy.get(':nth-child(2) > .form-control').clear().type('editado');
    cy.get(':nth-child(3) > .form-control').clear().type('editado');
    cy.get(':nth-child(4) > .form-control').clear().type('editado');
    cy.get('.btn').click();
    cy.wait('@editArticle');
  }
  checkPostEdited(articleTitle) {
    cy.get('h1').should('have.text', articleTitle);
  }
  checkLastPostCreated(articleTitle) {
    //Check on My articles
    cy.get(':nth-child(4) > .nav-link').click();
    cy.get(':nth-child(1) > .preview-link > h1').should(
      'have.text',
      articleTitle
    );
    //Check on global feed
    cy.get('.navbar-brand').click();
    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link').click();
    cy.get('.col-md-9').should('contain', articleTitle);
  }
  interceptCreateArticle() {
    cy.intercept({
      method: 'POST',
      url: '/api/articles',
    }).as('createArticle');
  }
  interceptEditArticle() {
    cy.intercept({
      method: 'PUT',
      url: '/api/articles/*',
    }).as('editArticle');
  }
  interceptGetArticles() {
    cy.intercept({
      method: 'GET',
      url: '/api/articles/*',
    }).as('getArticles');
  }
}
