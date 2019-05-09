module.exports = {
  'Title renders': (browser) => {
    browser
      .url('http://localhost:3000')
      .assert.title('Homepage | The Company')
      .end()
  }
}
