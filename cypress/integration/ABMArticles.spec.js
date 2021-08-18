/// <reference types="cypress" />

import { ABMArticles } from '../page-objects/ABMArticles.js';

describe('ABM of Articles tests', () => {
  const Articles = new ABMArticles();
  before(() => {
    Articles.interceptGetArticles();
    cy.visit('/');
    cy.loginAutomationUser();
    cy.wait('@getArticles');
  });

  it('Create an Article', () => {
    const articleTitle = 'Articulo de pruebaa';
    const articleAbout = 'texto sobre que es el articulo';
    const articleDesc = 'Descripcion del articulo';
    const tags = 'Tags del articulo';
    Articles.newPost(articleTitle, articleAbout, articleDesc, tags);
    Articles.checkLastPostCreated(articleTitle);
  });

  it('Edit an Article', () => {
    const articleTitle = 'Articulo para ser editado';
    const articleAbout = 'texto para ser editado';
    const articleDesc = 'Descripcion para ser editada';
    const tags = 'Tags del articulo a editar';
    Articles.newPost(articleTitle, articleAbout, articleDesc, tags);
    Articles.checkLastPostCreated(articleTitle);
    Articles.editPost();
    Articles.checkPostEdited('editado');
  });
});
