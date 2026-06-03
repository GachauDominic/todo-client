describe("navigating the navigation bar", ()=>{
  beforeEach(()=>{
    cy.visit('/')
    cy.viewport(1280, 720)
  })
  it("should visit multiple pages", ()=>{
    cy.location("pathname").should("equal", '/')

    cy.getDataTest("desktop-nav-about").as("aboutLink")
    cy.get('@aboutLink').click()
    cy.location("pathname").should("equal", '/about')
    cy.contains("About TodoPro").should('be.visible')

    cy.getDataTest("desktop-nav-register").as("registerLink")
    cy.get("@registerLink").click()
    cy.location("pathname").should("equal", '/register')
    
    cy.visit('/')
    cy.getDataTest("desktop-nav-login").click()
    cy.location("pathname").should("equal", '/login')


  })
})