module.exports = {
  'Homepage renders in SSR': (browser) => {
    browser
      .url('http://localhost:3000')
      .expect.element('body').to.be.present.before(3000)
      .assert.containsText('.content p', 'This is demo for')
      .end()
  }
}
