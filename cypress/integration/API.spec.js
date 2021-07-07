/// <reference types="cypress" />

import { ABMArticles } from '../page-objects/ABMArticles';
import { SignUp } from '../page-objects/Signup';

describe('API testing', () => {
  let token;
  const article = new ABMArticles();
  const signUp = new SignUp();
  const { internet } = require('faker');

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://qa-react-conduit.herokuapp.com/api/users/login',
      form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        user: {
          email: Cypress.env('USER_EMAIL'),
          password: Cypress.env('USER_PASSWORD'),
        },
      },
    })
      .its('body')
      .then((res) => {
        token = res.user.token;
      });
  });

  it('should create a POST from the logged user', () => {
    article.apiCreateArticle(
      token,
      'Titulo desde Cypress',
      'Desc desde cypress',
      'Body desde cypress'
    );
  });

  it('should create a new User', () => {
    const id = Math.floor(Math.random() * 10000);
    const username = `username${id}`;
    signUp.apiCreateUser(
      username,
      internet.exampleEmail(),
      internet.password()
    );
  });
});
