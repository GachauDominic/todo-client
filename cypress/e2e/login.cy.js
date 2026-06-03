describe("login functionality should bve working", ()=>{
  beforeEach(()=>{
    cy.visit('/login')
    cy.viewport(1280,720)
  })

  it('should login with valid credentials', ()=>{
    // First asert wwe are in the login page
    cy.contains(/login to your account/i).should("be.visible")

    // get the email input
    cy.getDataTest('login-email-input').as("login-emailInput")
    cy.get('@login-emailInput')
      .should("be.visible")
      .should("have.attr", 'type', 'email')
      .type('dommaish@example.com')
    
    cy.getDataTest('login-password-input').as("login-passInput")
    cy.get('@login-passInput')
      .should("be.visible")
      .should("have.attr", 'type', 'password')
      .type(123456)

    cy.getDataTest('login-submit-btn').as("login-submitBtn")
    cy.get('@login-submitBtn')
      .should("be.visible")
      .should("have.attr", 'type', 'submit')
      .should("contain.text", "Login")
      .should("not.be.disabled")
      .click()

  })

  it("should not login with incorrect/invalid credentials",()=>{
    // First asert wwe are in the login page
    cy.contains(/login to your account/i).should("be.visible")

    // get the email input
    cy.getDataTest('login-email-input').as("login-emailInput")
    cy.get('@login-emailInput')
      .should("be.visible")
      .should("have.attr", 'type', 'email')
      .type('dommaish@example.com')
    
    cy.getDataTest('login-password-input').as("login-passInput")
    cy.get('@login-passInput')
      .should("be.visible")
      .should("have.attr", 'type', 'password')
      .type(12345689890)

    cy.getDataTest('login-submit-btn').as("login-submitBtn")
    cy.get('@login-submitBtn')
      .should("be.visible")
      .should("have.attr", 'type', 'submit')
      .should("contain.text", "Login")
      .should("not.be.disabled")
      .click()
    cy.contains(/login failed. please check your credentials and try again./i)

  })
})