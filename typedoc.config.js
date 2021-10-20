const packageJson = require('./package.json')

const title = packageJson.name.split('-').map(
  word => word.slice(0, 1).toUpperCase() + word.slice(1)
).join(' ')

module.exports = {
  name: title,
  includeVersion: true,
  entryPointStrategy: 'expand',
  entryPoints: ['src'],
  readme: 'README.md',
  exclude: ['src/tests', 'src/**/tests', 'src/**/**/tests'],
  out: 'docs',
  excludeInternal: true,
  excludePrivate: true,
  excludeProtected: true,
  cleanOutputDir: true,
  theme: 'node_modules/typedoc-github-wiki-theme/dist'
}
