/* eslint-disable no-undef */
describe('blog app testing', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'salainenPassword',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })


  it('login and logout works with correct credentials', function() {
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
    cy.contains('log in to blog application')
    cy.get('input:first')
      .type('mluukkai')
    cy.get('input:last')
      .type('wrong')
    cy.contains('log in to blog application')
  })

  it('user can add a blog', function() {
    cy.get('input:first')
      .type('hellas')
    cy.get('input:last')
      .type('salainenPassword')
    cy.contains('login')
      .click()
    cy.contains('Arto Hellas logged in')
    cy.contains('new blog')
      .click()
    cy.get('#title')
      .type('Testing add blog with Cypress')
    cy.get('#author')
      .type('Test Author')
    cy.get('#url')
      .type('localhost/test/cypress')
    cy.contains('submit')
      .click()
    cy.contains('Testing add blog with Cypress')
  })

  it('error message is shown if no input text', function() {
    cy.get('input:first')
      .type('hellas')
    cy.get('input:last')
      .type('salainenPassword')
    cy.contains('login')
      .click()
    cy.contains('new blog')
      .click()
    cy.contains('submit')
      .click()
    cy.contains('title or url missing')
    cy.contains('logout')
      .click()
  })
})