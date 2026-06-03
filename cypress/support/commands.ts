/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('getDataTest', (dataTestSelector)=>{
  return cy.get(`[data-test="${dataTestSelector}"]`)
})

// login as admin
Cypress.Commands.add('loginAsAdmin',(email='dommaish@example.com', password='123456')=>{
  cy.visit('/login')
    // get the email input
    cy.getDataTest('login-email-input')
      .should("be.visible")
      .should("have.attr", 'type', 'email')
      .type(email)
    
    cy.getDataTest('login-password-input')
      .should("be.visible")
      .should("have.attr", 'type', 'password')
      .type(password)

    cy.getDataTest('login-submit-btn')
      .should("be.visible")
      .should("have.attr", 'type', 'submit')
      .should("contain.text", "Login")
      .should("not.be.disabled")
      .click()

    // cy.url()
    //   .should('include', '/admin/dashboard/todos').as('adminDashboardUrl')

    // assert we are in the admin dashboard  
    // cy.get('body').should("contain.text", "Welcome to your Admin Dashboard")
      
})

/* eslint-disable @typescript-eslint/no-namespace */
export{}
declare global {
  namespace Cypress {
    interface Chainable {
    getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
    loginAsAdmin(email: string, password:string): Chainable<void>
    }
  }
}