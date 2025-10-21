class Carrinho {
  verifyProductCart() {
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible').should('have.text', 'Blue Top'); // product name
      cy.get('p').contains('Category: Women > Tops').should('be.visible');
      cy.get('span').contains('Rs. 500').should('be.visible');
      cy.get('label').contains('Quantity').should('be.visible');
      cy.get('#quantity').should('have.value', 1);

    });
  }

  addProductCart() {
    cy.get('button').contains('Add to cart').should('be.visible').click();
  }


  viewDetailCart() {
    cy.get('.text-center a[href="/view_cart"]').click();
  }


  proceedToCheckout() {
      cy.get('.btn.btn-default.check_out').contains('Proceed To Checkout').should('be.visible').click();
  }
  placeOrder() {
       cy.get('.btn.btn-default.check_out').contains('Place Order').should('be.visible').click();
  }


  fillPayment() {
    cy.get('[name="name_on_card"]').type('Test User');
    cy.get('[name="card_number"]').type('4111111111111111');
    cy.get('[name="cvc"]').type('123');
    cy.get('[name="expiry_month"]').type('12');
    cy.get('[name="expiry_year"]').type('2028');
  }


  confirmPayment() {
    cy.get('[data-qa="pay-button"]').contains('Pay and Confirm Order').should('be.visible').click();
  }
}
export default new Carrinho();
