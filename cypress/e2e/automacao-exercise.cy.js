/// <reference types="cypress" />
import userData from '../fixtures/example.json';
import { faker } from '@faker-js/faker';

import { getRandonEmail, getRandonNumber } from '../support/helpers.js';


describe('Automation Exercise', () => {

  beforeEach(() => {
    cy.viewport('iphone-xr');
    cy.visit('https://automationexercise.com/signup');
    cy.get('a[href="/login"]').click();
  })
  it('Logs  Example', () => {
    cy.log('STEP 1 :: PGATS AUTOMAÇÃO WEB CY LOG');
    cy.log('STEP 2 :: PGATS AUTOMAÇÃO WEB CY LOG');

   // throw new Error('Error for demonstration purposes');
    cy.log(`getRandonNumber: ${getRandonNumber()}`);
    cy.log(`getRandonEmail: ${getRandonEmail()}`);

    console.log(`PGATS AUTOMAÇÃO WEB CY LOG`);
    cy.log(`Nome do usuário: ${userData.name}`)
    cy.log(`E-mail do usuário: ${userData.email}`)
  })

  it.only('should register new user', () => {
    const email = getRandonEmail();


    cy.get('[data-qa="signup-name"]').type(userData.name)
    cy.get('[data-qa="signup-email"]').type(email);
    cy.contains('button', 'Signup').click();

    cy.get('#id_gender1').click();
    //cy.get('input[type=radio]').check('Mrs');
    cy.get('[data-qa="password"]').type('654321', { log: false });

    // comboxes ou selects -> select
    cy.get('select#days').select('10');
    cy.get('select#months').select('May');
    cy.get('select#years').select('1990');

    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();

    //address information
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

    // arrange - act - assert
    cy.url().should('include', 'account_created')
    cy.contains('b', 'Account Created!')
    cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
  });

  it('should login with email and password correct', () => {
    cy.visit('https://automationexercise.com/login');
    cy.get('[data-qa="login-email"]').type('qa-tester1759568357549@tester.com');
    cy.get('[data-qa="login-password"]').type('123456', { log: false });
    cy.get('[data-qa="login-button"]').click();

    cy.get('i.fa-user').parent().should('contain', 'QATester');
    cy.get('a[href="/logout"]').should('be.visible');
    cy.contains('b', 'QATester').should('be.visible');


cy.get(':nth-child(10) > a')
      .should('be.visible')
      .and('have.text', ' Logged in as QATester');

    cy.contains(`Logged in as QATester`).should('be.visible');

  });

    it('should login with email and password  incorrect', () => {
    cy.visit('https://automationexercise.com/login');
    cy.get('[data-qa="login-email"]').type('qa-tester956835754@tester.com');
    cy.get('[data-qa="login-password"]').type('654321', { log: false });
    cy.get('[data-qa="login-button"]').click();


   cy.get('.login-form > form > p').should('contains.text', 'Your email or password is incorrect!');

    });


    it('Should logout user', () => {
    cy.visit('https://automationexercise.com/login');
    cy.get('[data-qa="login-email"]').type('qa-tester1759568357549@tester.com');
    cy.get('[data-qa="login-password"]').type('123456', { log: false });
    cy.get('[data-qa="login-button"]').click();

   cy.get('i.fa-user').parent().should('contain', 'QATester');

   //act
   cy.get('a[href="/logout"]').should('be.visible').click();
   //assert
    cy.url().should('contains', 'login');
    cy.contains('Login to your account');

   cy.get('a[href="/logout"]').should('not.exist');
   cy.get('a[href="/login"]').should('contain', 'Signup / Login');

    });

  it('Should register user with e-mail already used', () => {


    cy.get('[data-qa="signup-name"]').type('QATester')
    cy.get('[data-qa="signup-email"]').type('qa-tester1759568357549@tester.com');

    cy.contains('button', 'Signup').click();

    cy.get('.signup-form > form > p').should('contains.text', 'Email Address already exist!');
  });

  it("Should send  through Contact Form with upload ", () => {
    cy.get(`a[href*="contact"]`).click();

     cy.get('[data-qa="name"]').type(userData.name);
     cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type(userData.subject);
    cy.get('[data-qa="message"]').type(userData.message)

    cy.fixture('example.json').as('file')
    cy.get('input[type=file]').selectFile('@file')

    cy.get('[data-qa="submit-button"]').click();

    //asserts
    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

});
});
