describe("login functionality should be working", ()=>{
  beforeEach(()=>{
    cy.viewport(1920,900)
    //login as admin
    cy.loginAsAdmin()
    // cy.wait(loginAsAdmin())
  })
  
  it("should create a todo via the UI",()=>{
    const todoName = `Cypress E2E Test Todo ${Date.now()}`
    
    // get create todo btn
    cy.getDataTest('create-todo-btn').as('createTodoBtn')
    cy.get('createTodoBtn')
      .should("be.visible")
      .should("contain.text", "Create Todo")
      .click()  
 
    cy.getDataTest('todo-name-input').as('todonameInput')
    cy.get('@todonameInput')
      .type(todoName)

    cy.getDataTest('todo-userId-input').as('todoUserIdInput')
    cy.get('@todoUserIdInput')
      .type('800')

    cy.getDataTest('todo-date-input').as('todoDateInput')
    cy.get('@todoDateInput')
      .type('2026-07-02')
  
    cy.getDataTest('create-todo-submit-btn').as('createTodoSubmitBtn')
    cy.get('@createTodoSubmitBtn')
      .click()
    cy.contains('Todo created successfully').should('be.visible');
    cy.contains(todoName).should('be visible');
    
    //spy on the DELETE request|query
    cy.intercept('DELETE', '/todo/*').as('deleteTodo')
    cy.contains('tr', todoName)
      cy.get('[data-test="delete-todo-btn"]').click();
    
     cy.get('[data-test="delete-todo-confirm-btn"]').click()
    //  wait for the delete request to finish
    cy.wait('(@deleteTodo');

  })
})