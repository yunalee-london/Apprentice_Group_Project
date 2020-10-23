describe("Adding boards", () => {
    it('adds a new board to the projectboards', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('New User')
        cy.get('input').type('name')
        cy.get('button').click()
          })
    })
