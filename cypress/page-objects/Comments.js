/// <reference types="cypress" />

export class Comment {
  addComment(comment) {
    cy.get('.form-control').type(comment);
    cy.get('.card-footer > .btn').click();
  }

  getArticle(position) {
    cy.get(`:nth-child(${position}) > .preview-link > h1`).click();
  }

  getGlobalFeed() {
    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link').click();
  }

  checkComment(commentText) {
    cy.get(':nth-child(1) > .card-block > .card-text').should(
      'have.text',
      commentText
    );
  }
  checkCommentDate(day, month) {
    cy.get(':nth-child(1) > .card-footer').should(($e) => {
      expect($e).to.contain(day);
      expect($e).to.contain(month);
    });
  }

  deleteAndCheckLastComment(text) {
    cy.get('.card-footer > .mod-options > .ion-trash-a').last().click();
    cy.get(':nth-child(4) > .col-xs-12').should('not.contain', text);
  }

  checkBlankCommentRequest() {
    cy.get('@postComment').its('response.statusCode').should('eq', 422);
  }
}
