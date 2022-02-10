import homeTodoPage from '../pages.todolist/homeTodoPage'

describe('suite test-todo', () => {
    beforeEach(() => {
        cy.visit('http://www.todobackend.com/client/index.html?https://todo-backend-pef-front.herokuapp.com/')
        
    })

    it('01-test adding new todo items', () => {
        //This test is sufficient because it validates the adding items functionality, the items list and the item value after adding it.
        const newItem = 'Hello'

        homeTodoPage.typeItem(newItem)
        homeTodoPage.elements.todoElement()
            .should('have.length', 1)
            .should('have.text', newItem)
    })

    it('02-test editing existing todo item', () => {
        //This test is sufficient because it validates the editing items functionality, the items list and the item value after editing it.
        //This test assume that the PATCH endpoint is not available and mock that response
        const item = 'Hello'
        const newValueItem = 'Bye'

        cy.intercept('PATCH', '**/*', { fixture: 'edited-item-response.json' }).as('editingItem')

        homeTodoPage.typeItem(item)
        cy.contains(item)
            .dblclick().get('.editing').wait(50)
            .type(`{selectall}${newValueItem}{enter}`)

        homeTodoPage.elements.todoElement()
            .should('have.length', 1)
            .should('have.text', newValueItem)
    })

    it('03-test deleting existing todo item', () => {
        //This test is sufficient because it validates the deleting items functionality and and its absence in the TODO list.
        const item = 'Hello Delete'
        
        homeTodoPage.typeItem(item)
        homeTodoPage.deleteItems()
        cy.contains(item)
            .should('not.exist')
    })

})