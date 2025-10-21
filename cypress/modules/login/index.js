import { faker } from '@faker-js/faker';

import { getRandonEmail } from '../../support/helpers.js';

export function fillPreLoginForm() {
  const email = getRandonEmail();

   const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`);
    cy.get('[data-qa="signup-email"]').type(email);

  cy.contains('button', 'Signup').click();
}
export function fillPreLoginEmailAlready(name, email) {
   cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);

    cy.contains('button', 'Signup').click();
 }
export function fillLoginForm(email, password) {

     cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { log: false });
    cy.get('[data-qa="login-button"]').click();
}



// outra forma de fazer
/* class Login {
  fillPreLoginForm() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`);
    cy.get('[data-qa="signup-email"]').type(getRandonEmail());
    cy.contains('button', 'Signup').click();

}
    }
export default new Login();

    */
