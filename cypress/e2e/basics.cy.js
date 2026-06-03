describe('Fundamentals Tests', () => {
  beforeEach(()=>{
    cy.visit('/')
  }),
  it("contains correct header text", ()=>{
    // cy.get('h1').contains(/Welcome TO TodoPro!/i)
    // cy.get('[data-test="welcome-header"]').contains(/welcome to todopro!/i)
    // cy.get('[data-test="welcome-header"]').should('contain.text', 'Welcome to TodoPro!')

    cy.getDataTest('welcome-header').should('contain.text', 'Welcome to TodoPro!')
  })
  it("Menu works correctly",()=>{
    cy.visit('/')
    cy.getDataTest('mobile-menu-bars').click()
    cy.getDataTest('todo-ul-menu').should('be.visible')

    // veryfying all menu items are present and visible
    cy.getDataTest('todo-ul-menu').within(()=>{
      cy.contains('Home')
      cy.contains(/about/i)
    })
    
  }) 
})