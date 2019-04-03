module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1
    }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.js'],
      css: ['./src/styles/*.css']
    }),
    require('postcss-nested'),
    require('autoprefixer')
  ]
}
