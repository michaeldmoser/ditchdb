export default {
  paths: [ 'features/**/*.feature' ],
  import: ['features/steps/*.{mjs,ts}'],
  requireModule: ['ts-node/register'],
  publishQuiet: true,
}