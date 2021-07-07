declare namespace Cypress {
  interface Chainable {
    logOut();
    loginAutomationUser();
    loginCustomUser(user, password);
  }
}
