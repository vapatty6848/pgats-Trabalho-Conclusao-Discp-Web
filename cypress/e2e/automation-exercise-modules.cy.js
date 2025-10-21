/// <reference types="cypress" />
import userData from '../fixtures/example.json';




import { navigateToMenuLogin } from '../modules/menu';
import { fillLoginForm, fillPreLoginForm } from '../modules/login';
import { fillContactForm } from '../modules/contato';

import { fillPreLoginEmailAlready } from '../modules/login';
import cadastro from '../modules/cadastro';
import Carrinho from '../modules/carrinho';


describe('Automation Exercise', () => {


  beforeEach(() => {
    cy.viewport('iphone-xr');
    cy.visit('https://automationexercise.com/signup');
    navigateToMenuLogin();

  })


  it('Test Case 1: Register User ', () => {

    fillPreLoginForm();

   cadastro.fillCompleteRegistrationForm();


    // arrange - act - assert
    cy.url().should('include', 'account_created')
    cy.contains('b', 'Account Created!')
    cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
  });

  it('Test Case 2: Login User with correct email and password ', () => {
    fillLoginForm(userData.email, userData.password);

   cy.get('i.fa-user').parent().should('contain', 'QATester');
    cy.get('a[href="/logout"]').should('be.visible');
    cy.contains('b', 'QATester').should('be.visible');


cy.get(':nth-child(10) > a')
      .should('be.visible')
      .and('have.text', ' Logged in as QATester');

    cy.contains(`Logged in as QATester`).should('be.visible');

  });

  it('Test Case 3: Login User with incorrect email and password', () => {
   fillLoginForm(userData.email, 'incorrectPassword');

   cy.get('.login-form > form > p').should('contain.text', 'Your email or password is incorrect!');

    });

    it('Test Case 4: Logout User', () => {
    fillLoginForm(userData.email, userData.password);

   cy.get('i.fa-user').parent().should('contain', 'QATester');

   //act
   cy.get('a[href="/logout"]').should('be.visible').click();
   //assert
    cy.url().should('include', 'login');
    cy.contains('Login to your account');

   cy.get('a[href="/logout"]').should('not.exist');
   cy.get('a[href="/login"]').should('contain', 'Signup / Login');

    });

  it('Test Case 5: Register User with existing email', () => {

     fillPreLoginEmailAlready('User Test', userData.email);
    cy.get('.signup-form > form > p').should('contain.text', 'Email Address already exist!');
  });

  it("Test Case 6: Contact Us Form with upload ", () => {

   fillContactForm(userData.name, userData.email, userData.subject, userData.message);

    //asserts
    cy.get('.status').should('be.visible')
  cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

});

it('Test Case 8: Verify All Products and product detail page', () => {

    cy.get('body').should('be.visible');
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('.features_items').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
    cy.get('.features_items .product-image-wrapper').first().find('a').contains('View Product').click();
    cy.url().should('include', '/product_details/');

    Carrinho.verifyProductCart();
    Carrinho.addProductCart();

    cy.get(' .modal-header').should('contain.text', 'Added!');
    cy.get(' .modal-body').should('contain.text', 'Your product has been added to cart');

    Carrinho.viewDetailCart();

    cy.get('#product-1 .cart_product img').should('be.visible');
    cy.get('#product-1 .cart_description h4 a').should('have.text', 'Blue Top');
    cy.get('#product-1 .cart_description p').should('have.text', 'Women > Tops');
    cy.get('#product-1 .cart_price p').should('have.text', 'Rs. 500');
    cy.get('#product-1 .cart_quantity .disabled').should('have.text', '1');
    cy.get('#product-1 .cart_total p').should('have.text', 'Rs. 500');

  });

  it('Test Case 9: Search Product', () => {

    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('#search_product').type('Dress');
    cy.get('#submit_search').click();
    cy.contains('Searched Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
  });



  it('Test Case 10: Verify Subscription in home page', () => {


    cy.get('body').should('be.visible');
    cy.get('footer', { timeout: 10000 }).scrollIntoView();
    cy.contains(/SUBSCRIPTION/i).should('be.visible');

    cy.get('footer').within(() => {
      cy.get('input[type="email"], input[name="email"], input#susbscribe_email, input[name="subscribe_email"]')
        .first()
        .should('exist')
        .type(userData.email, { force: true });

      cy.get('#subscribe').click();
    });

    // Validar resposta: aceitar várias variações de texto de sucesso
    cy.contains(/successfully|subscribed|thank you|thanks/i, { timeout: 10000 }).should('be.visible');
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    fillPreLoginForm();
    cadastro.fillCompleteRegistrationForm();

   cy.get('body').should('be.visible');
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('.features_items').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
    cy.get('.features_items .product-image-wrapper').first().find('a').contains('View Product').click();
    cy.url().should('include', '/product_details/');

    Carrinho.verifyProductCart();

    Carrinho.addProductCart();

    Carrinho.viewDetailCart();

    Carrinho.proceedToCheckout();

    cy.get('.checkout-information').should('be.visible');
    cy.get('textarea[name="message"]').type('Pedido de teste automatizado');

    Carrinho.placeOrder();

    Carrinho.fillPayment();
    Carrinho.confirmPayment();

    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

    cy.contains('Delete Account').click();
    cy.get('[data-qa="account-deleted"]').contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();


  });

  });
