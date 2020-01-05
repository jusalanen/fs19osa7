/* eslint-disable no-undef */
describe('Blogs app', () => {
  it('login works with correct credentials', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to blog application')
    cy.get('input:first')
      .type('hellas')
    cy.get('input:last')
      .type('salainenPassword')
    cy.contains('login')
      .click()
    cy.contains('Arto Hellas logged in')
    cy.contains('logout')
      .click()
    cy.contains('log in to blog application')
  })

  it('cannot enter with bad credentials', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to blog application')
    cy.get('input:first')
      .type('mluukkai')
    cy.get('input:last')
      .type('wrong')
    cy.contains('log in to blog application')
  })
})