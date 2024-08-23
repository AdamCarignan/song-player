describe('Audio Player', () => {
  it('Plays Audio', () => {
    cy.visit('/')
    cy.get('.composition-name:first').click()
    cy.get('#load-audio').click()
    cy.wait(5000)
    cy.get('#player-control').click()
  })
})
