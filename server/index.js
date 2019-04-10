const { resolve, basename } = require('path')
require('dotenv').config({ path: resolve(__dirname, '../.env') })
const { strictEqual } = require('assert')
const { sync } = require('md5-file')
const ignoreStyles = require('ignore-styles')
const register = ignoreStyles.default
const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg']

strictEqual(typeof process.env.CONTACT_API_KEY, 'string', 'We need contact us API key')

register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (!extensions.find((f) => filename.endsWith(f))) {
    return ignoreStyles.noOp()
  } else {
    const hash = sync(filename).slice(0, 8)
    const bn = basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`)
    mod.exports = `/static/media/${bn}`
  }
})

require('@babel/register')({
  ignore: [/\/(build|node_modules)\//],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-block-scoping',
    'dynamic-import-node',
    'react-loadable/babel'
  ]
})

require('@babel/polyfill')

require('./server')
