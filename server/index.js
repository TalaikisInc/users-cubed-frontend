const PROD = process.env.NODE_ENV === 'produciton'
const { resolve, basename } = require('path')
const env = PROD ? resolve(__dirname, '../.env') : resolve(__dirname, '../.env.sample')
require('dotenv').config({ path: env })
const { strictEqual } = require('assert')
const { sync } = require('md5-file')
const sass = require('node-sass')
const ignoreStyles = require('ignore-styles')
const register = ignoreStyles.default
const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg']

strictEqual(typeof process.env.CONTACT_API_KEY, 'string', 'We need contact us API key')
strictEqual(typeof process.env.UPLOAD_API_KEY, 'string', 'We need upload API key')

register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (!extensions.find((f) => filename.endsWith(f))) {
    return ignoreStyles.noOp()
  } else {
    const hash = sync(filename).slice(0, 8)
    const bn = basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`)
    mod.exports = `/static/media/${bn}`
  }
})

const processSass = (data, filename) => {
  let result

  result = sass.renderSync({
    data: data,
    file: filename
  }).css
  return result.toString('utf8')
}

require('@babel/polyfill')
require('@babel/register')({
  ignore: [/\/(build|node_modules)\//],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-block-scoping',
    'dynamic-import-node',
    'react-loadable/babel',
    [
      'babel-plugin-css-modules-transform',
      {
        extensions: ['.scss', '.sass'],
        preprocessCss: processSass,
        generateScopedName: '[local]__[hash:base64:5]'
      }
    ]
  ]
})

require('./server')
