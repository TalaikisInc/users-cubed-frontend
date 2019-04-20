module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'standard',
    'plugin:jsx-a11y/recommended',
    'plugin:security/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'jsx-a11y',
    'security'
  ],
  'rules': {
    'no-unused-vars': 0
  }
}
