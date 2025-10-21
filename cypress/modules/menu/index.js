export function navigateToMenuLogin() {
  cy.get('a[href="/login"]').click();
}

export function logout() {
   cy.get('a[href="/logout"]').should('be.visible').click();
}


/* outra forma de faazer
 class Menu {
  navigateToMenuLogin() {
    cy.get('a[href="/login"]').click();
  }
}

export default new Menu(); */
