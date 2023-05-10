import { expect } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { World } from 'playwright-bdd';

Given('I have the following properties:', async function ( table ) {
  console.dir(table.rows())
})

When('I list properties', async function () {
  await this.page.goto('http://127.0.0.1:8000/app/properties');
})

Then('I should see the following properties', async function () {
  await expect(this.page).toHaveTitle(/Properties/);
})