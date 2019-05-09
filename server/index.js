const md5File = require('md5-file')
const path = require('path')
const ignoreStyles = require('ignore-styles')
const register = ignoreStyles.default
const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg']

register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (!extensions.find(f => filename.endsWith(f))) {
    return ignoreStyles.noOp();
  } else {
    const hash = md5File.sync(filename).slice(0, 8);
    const bn = path.basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`)
    mod.exports = `/static/media/${bn}`
  }
})

require('@babel/polyfill');
require('@babel/register')({
  ignore: [/@babel[\/\\]runtime/, /\/(build|node_modules)\//, /node_modules/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-export-extensions',
    'dynamic-import-node',
    'react-loadable/babel'
  ]
})

require('./server')
