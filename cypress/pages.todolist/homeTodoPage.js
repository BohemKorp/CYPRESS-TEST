class homeTodoPage{
    elements = {
        todoInput: () => cy.get('#new-todo'),
        todoElement: () => cy.get('.view > label'),
        todoDelete: () => cy.get('.destroy')
    }

    typeItem(item){
        this.elements.todoInput().type(`${item}{enter}`)
    }

    deleteItems(){
        this.elements.todoDelete().invoke('show').click({ multiple: true })
    }
}

module.exports = new homeTodoPage();