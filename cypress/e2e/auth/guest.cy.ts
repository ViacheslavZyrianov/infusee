describe('Guest screen', () => {
  it('visits the app root url as guest', () => {
    cy.visit('/')
    cy.contains('.v-card-title', 'Welcome to Infusee')
    cy.contains('.v-card-subtitle', 'Ready to brew some magic? ✨')
    cy.contains('.v-card-actions button', ' Sign in with Google')
    cy.get('.v-card-text a').then(($links) => {
      const hrefs = $links.map((_, el) => el.getAttribute('href')).get()

      expect(hrefs).to.include('/terms-of-service')
      expect(hrefs).to.include('/privacy-policy')
    })
  })
})

describe('Footer navigation', () => {
  beforeEach(() => {
    // Start from the home page for each test
    cy.visit('/')
  })

  it('navigates from Home → Terms of Service → Privacy Policy → Home', () => {
    // Home → Terms of Service
    cy.get('a[href="/terms-of-service"]').click()
    cy.url().should('include', '/terms-of-service')
    cy.contains('h1', 'Terms of Service').should('exist')

    // Terms of Service footer → Privacy Policy
    cy.get('footer.v-footer a[href="/privacy-policy"], v-footer a')
      .contains('Privacy Policy')
      .click()
    cy.url().should('include', '/privacy-policy')
    cy.contains('h1', 'Privacy Policy').should('exist')

    // Privacy Policy footer → Home
    cy.get('footer.v-footer a[href="/"]').contains('Home').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.contains('.v-card-title', 'Welcome to Infusee')
  })

  it('navigates from Home → Privacy Policy → Terms of Service → Home', () => {
    // Home → Privacy Policy
    cy.get('a[href="/privacy-policy"]').click()
    cy.url().should('include', '/privacy-policy')
    cy.contains('h1', 'Privacy Policy').should('exist')

    // Privacy Policy footer → Terms of Service
    cy.get('footer.v-footer a[href="/terms-of-service"], v-footer a')
      .contains('Terms of Service')
      .click()
    cy.url().should('include', '/terms-of-service')
    cy.contains('h1', 'Terms of Service').should('exist')

    // Terms of Service footer → Home
    cy.get('footer.v-footer a[href="/"]').contains('Home').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.contains('.v-card-title', 'Welcome to Infusee')
  })
})
