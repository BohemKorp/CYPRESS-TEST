import homeTodoPage from '../pages.todolist/homeTodoPage'

describe('suite test-todo', () => {
    beforeEach(() => {
        cy.visit('http://www.todobackend.com/client/index.html?https://todo-backend-pef-front.herokuapp.com/')
        cy.request('https://todo-backend-pef-front.herokuapp.com/').then((response) => {
            if (response.body.length > 0) {
                homeTodoPage.deleteItems()
            }
        })
    })

    // it('01-test adding new todo items', () => {
    //     const newItem = 'Hello'

    //     homeTodoPage.typeItem(newItem)
    //     homeTodoPage.elements.todoElement()
    //         .should('have.length', 1)
    //         .should('have.text', newItem)
    // })

    it('02-test editing existing todo item', () => {
        const item = 'Hello'
        const newValueItem = 'Bye'
        cy.intercept('PATCH', '**/*', { fixture: 'edited-item-response.json' }).as('editingItem')

        homeTodoPage.typeItem(item)

        cy.contains(item)
            .dblclick().get('.editing').wait(100)
            .type(`{selectall}${newValueItem}{enter}`)

        homeTodoPage.elements.todoElement()
            .should('have.length', 1)
            .should('have.text', newValueItem)
    })

    // it('03-test deleting existing todo item', () => {
    //     const item = 'Hello Delete'
    //     homeTodoPage.typeItem(item)
    //     homeTodoPage.deleteItems()
    //     cy.contains(item)
    //         .should('not.exist')
            
    // })

})