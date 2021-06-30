/// <reference types = "cypress" />

import { ABMArticles } from '../page-objects/ABMArticles';
import { Comment } from '../page-objects/Comments';

describe('Comments section tests', () => {
  const articles = new ABMArticles();
  const comment = new Comment();

  beforeEach(() => {
    cy.visit('/');
    cy.loginAutomationUser();
    articles.interceptGetArticles();
    cy.wait('@getArticles');
  });

  it('see comment unlogged and check the date', () => {
    const commentText = 'AUTOMATED COMMENT';
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = today.toLocaleString('default', { month: 'short' });

    comment.getGlobalFeed(); // Get to global feed
    comment.getArticle(1); // Enter to the first article
    cy.wait('@getArticles');
    comment.addComment(commentText);
    cy.logOut();
    comment.getArticle(1); //Enter to the first article
    comment.checkComment(commentText); // Checks the last comment
    comment.checkCommentDate(day, month); // Checks the date of the last comment
  });

  it('Delete comment ', () => {
    const commentText = 'COMMENT TO BE DELETED';

    comment.getGlobalFeed(); // Get to global feed
    comment.getArticle(1); // Enter to the first article
    cy.wait('@getArticles');
    comment.addComment(commentText);
    cy.wait(2000);
    comment.deleteAndCheckLastComment(commentText);
  });

  it('Blank comment ', () => {
    // Creating an intercept for the comment POST request
    cy.intercept('POST', '/api/articles/**').as('postComment');

    comment.getGlobalFeed(); // Get to global feed
    comment.getArticle(1); // Enter to the first article
    cy.wait('@getArticles');
    comment.addComment('{backspace}');
    comment.checkBlankCommentRequest();
  });
});
