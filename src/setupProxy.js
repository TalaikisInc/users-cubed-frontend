const proxy = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(proxy('/api', {
    target: 'https://api.ufunc.com/',
    changeOrigin: true,
    secure: true
  }))

  app.use(proxy('/contactus', {
    target: 'https://mail.talaikis.com/contactus',
    changeOrigin: true,
    secure: true
  }))

  app.use(proxy('/upload', {
    target: 'http://upload.talaikis.com/',
    changeOrigin: true,
    secure: true
  }))
}
