/// <reference types="cypress" />

import { ABMArticles } from '../page-objects/ABMArticles.js';

describe('ABM of Articles tests', () => {
  const articles = new ABMArticles();
  before(() => {
    articles.interceptGetArticles();
    cy.visit('/');
    cy.loginAutomationUser();
    cy.wait('@getArticles');
  });

  it('Create an Article', () => {
    const articleTitle = 'Articulo de pruebaa';
    const articleAbout = 'texto sobre que es el articulo';
    const articleDesc = 'Descripcion del articulo';
    const tags = 'Tags del articulo';
    articles.newPost(articleTitle, articleAbout, articleDesc, tags);
    articles.checkLastPostCreated(articleTitle);
  });

  it('Edit an Article', () => {
    const articleTitle = 'Articulo para ser editado';
    const articleAbout = 'texto para ser editado';
    const articleDesc = 'Descripcion para ser editada';
    const tags = 'Tags del articulo a editar';
    articles.newPost(articleTitle, articleAbout, articleDesc, tags);
    articles.checkLastPostCreated(articleTitle);
    articles.editPost();
    articles.checkPostEdited('editado');
  });
});
