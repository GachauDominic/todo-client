describe("login functionality should be working", ()=>{
  beforeEach(()=>{
    cy.visit('/register')
    cy.viewport(1280,720)
  })

  //hapy path test
  it("should register a new user with their email and password been valid", ()=>{
    // Mock the API call having a successful response
    cy.intercept('POST', '/auth/register', {
      statusCode: 201,
      body: {
        message: "New user created. Please chech your email to verify your account",
        user:{
          id: 125,
        FirstName: "new",
        LastName: "user",
        Email: "newuser@example.com",
        role: "user",
        isVerified: false,
        }
      }
    }).as("signUp")

    cy.getDataTest("signup-firstName").as('firstNameInput')
    cy.get('@firstNameInput')
    .type("new")

  cy.getDataTest("signup-lasttName").as('lastNameInput')
  cy.get('@lastNameInput')
    .type("user")

  cy.getDataTest("signup-email").as('emailInput')
  cy.get('@emailInput')
    .should("have.attr", "type", "email")
    .type("newuser@example.com")

  cy.getDataTest("signup-password").as('passwordInput')
  cy.get('@passwordInput')
    .should("have.attr", "type", "password")
    .type(123456)

  cy.getDataTest("signup-confirmPassword").as('confirmpassInput')
  cy.get('@confirmpassInput')
    .should("have.attr", "type", "password")
    .type(123456)

  cy.getDataTest("register-btn").as('registerBtn')
  cy.get('@registerBtn')  
    .should("be.visible")
      .should("have.attr", 'type', 'submit')
      .should("contain.text", "Register")
      .should("not.be.disabled")
      .click()

  cy.wait("@signUp")
    .then((interception)=>{
      expect(interception.response.statusCode).to.eq(201)

      expect(interception.request.body).to.deep.include({
        firstName: "new",
        lastName: "user",
        email: "newuser@example.com",
        password: '123456',
        confirmPassword: '123456'
      })

    })

    cy.url().should('include', '/register/verify')
    
  })

  // negative path test 
  it("should not register a new user with their email and password been invalid", ()=>{
    // Mock the API call having a successful response
    cy.intercept('POST', '/auth/register', {
      statusCode: 201,
      body: {
        message: "New user created. Please chech your email to verify your account",
        user:{
          id: 125,
        FirstName: "new",
        LastName: "user",
        Email: "newuser@example.com",
        role: "user",
        isVerified: false,
        }
      }
    }).as("signUp")

    cy.getDataTest("signup-firstName").as('firstNameInput')
    cy.get('@firstNameInput')
    .type("new")

  cy.getDataTest("signup-lasttName").as('lastNameInput')
  cy.get('@lastNameInput')
    .type("user")

  cy.getDataTest("signup-email").as('emailInput')
  cy.get('@emailInput')
    .should("have.attr", "type", "email")
    .type("newuser@example.com")

  cy.getDataTest("signup-password").as('passwordInput')
  cy.get('@passwordInput')
    .should("have.attr", "type", "password")
    .type(123456)

  cy.getDataTest("signup-confirmPassword").as('confirmpassInput')
  cy.get('@confirmpassInput')
    .should("have.attr", "type", "password")
    .type(112774)

  cy.getDataTest("register-btn").as('registerBtn')
  cy.get('@registerBtn')  
    .should("be.visible")
    .should("have.attr", 'type', 'submit')
    .should("contain.text", "Register")
    .should("not.be.disabled")
    .click()

   cy.contains("Passwords must match")  
   
  }) 
})