import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild.js';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5174',
    specPattern: [
      'cypress/e2e/**/*.feature',
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
    ],
    setupNodeEvents
  }
});

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', preprocessor(config));

  return config;
}

function preprocessor(config: Cypress.PluginConfigOptions) {
  const vitePreprocess = vitePreprocessor();
  const cucumberPreprocessor = createBundler({
    plugins: [createEsbuildPlugin(config)]
  });

  return async (file: Cypress.FileObject) => {
    if (file?.filePath.endsWith('.feature')) return cucumberPreprocessor(file);

    return vitePreprocess(file);
  };
}
