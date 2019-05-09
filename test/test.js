require('supertest')
const chai = require('chai')
chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { beforeEach, afterEach, describe, it } = require('mocha')
const expect = chai.expect
process.env.TESTING = true
let server

beforeEach(() => {
  server = require('../server/server')
})

afterEach(() => {
  require('../server/server').stop()
})

describe('SSR works', () => {
  it('for homepage', async (done) => {
    chai.request(server).get('/').then((res) => {
      expect(res).to.have.status(200)
      res.text.should.contain('This is demo for')
      done()
    }).catch((e) => {
      console.log(e.message)
    })
  })

  it('for signin', async (done) => {
    chai.request(server).get('/signin').then((res) => {
      expect(res).to.have.status(200)
      res.text.should.contain('Password')
      done()
    }).catch((e) => {
      console.log(e.message)
    })
  })

  it('for signup', async (done) => {
    chai.request(server).get('/signup').then((res) => {
      expect(res).to.have.status(200)
      res.text.should.contain('Repeat Password')
      done()
    }).catch((e) => {
      console.log(e.message)
    })
  })

  it('for not found page', async (done) => {
    chai.request(server).get('/zzzz').then((res) => {
      expect(res).to.have.status(404)
      res.text.should.contain('find anything like this.')
      done()
    }).catch((e) => {
      console.log(e.message)
    })
  })
})
