import { When, Then, Step } from '@badeball/cypress-cucumber-preprocessor';

When('I visit the frontpage', () => {
  cy.visit('/');
});

Then('I should see Vite + React', () => {
  cy.findByRole('heading', { level: 1, name: 'Vite + React' });
});

When('I click the button', function () {
  Step(this, 'I visit the frontpage');
  cy.findByRole('button').click();
});

Then('the count should be 1', function () {
  cy.findByRole('button', { name: 'count is 1' }).should('exist');
});
