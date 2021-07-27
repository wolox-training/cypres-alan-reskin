/// <reference types="cypress" />

import { ABMArticles } from '../page-objects/ABMArticles';
import { Favorites } from '../page-objects/Favorites';
import { Profile } from '../page-objects/Profile';
import { SignUp } from '../page-objects/Signup';

describe('Profile tests', () => {
  const { internet } = require('faker');
  const favorites = new Favorites();
  const profile = new Profile();
  const articles = new ABMArticles();
  const signUp = new SignUp();
  const id = Math.floor(Math.random() * 10000);
  const username = `username${id}`;
  const articleTitle = 'Articulo de pruebaa';
  const articleAbout = 'texto sobre que es el articulo';
  const articleDesc = 'Descripcion del articulo';
  const tags = 'Tags del articulo';

  before(() => {
    // Creating a new user for an user with no favorites
    cy.visit('/');
    signUp.signUpPage();
    signUp.addUsername(username);
    signUp.addEmail(internet.exampleEmail());
    signUp.addPassword(internet.password());
    signUp.clickSignUpButton();
    signUp.getLoggedUsername(username);
    // Creating a post from that new user
    articles.newPost(articleTitle, articleAbout, articleDesc, tags);
    articles.checkLastPostCreated(articleTitle);
  });

  beforeEach(() => {
    cy.visit('/');
    cy.loginAutomationUser();
    articles.interceptGetArticles();
    cy.wait('@getArticles');
    articles.globalFeedPage();
  });

  it('Check article create from another user', () => {
    profile.getProfileFromFeed(username);
    articles.checkArticle(articleTitle);
  });

  it('Check favorites page from another user w/o favorites', () => {
    profile.getProfileFromFeed(username);
    articles.checkArticle(articleTitle);
    favorites.goToOthersFavoritesArticles();
    favorites.checkNoFavorites();
  });
});
