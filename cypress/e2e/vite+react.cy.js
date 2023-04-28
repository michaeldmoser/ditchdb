describe('Basic page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5174');
    cy.findByRole('heading', { level: 1, name: 'Vite + React' });
  });
});
