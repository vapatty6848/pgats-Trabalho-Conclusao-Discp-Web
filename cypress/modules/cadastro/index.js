import { faker } from '@faker-js/faker';

class Cadastro {
  fillCompleteRegistrationForm() {
    cy.get('#id_gender1').click();

    cy.get('[data-qa="password"]').type('654321', { log: false });
    
    cy.get('select#days').select('10');
    cy.get('select#months').select('May');
    cy.get('select#years').select('1990');

    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();

    cy.get('input#first_name').type(faker.person.firstName());
    cy.get('input#last_name').type(faker.person.lastName());
    cy.get('input#company').type(faker.company.name());
    cy.get('input#address1').type(faker.location.streetAddress());

    cy.get('select#country').select('India');
    cy.get('input#state').type(faker.location.state());
    cy.get('input#city').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type(faker.phone.number());

    cy.get('[data-qa="create-account"]').click();
  }
}

export default new Cadastro();
