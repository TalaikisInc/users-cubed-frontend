import { resolve } from 'path'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import Loadable from 'react-loadable'
import cookieParser from 'cookie-parser'
import rfs from 'rotating-file-stream'
import passport from 'passport'

import loader from './loader'
import setHeaders from './headers'
const app = express()
const PORT = 3000
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: resolve(__dirname, '../.logs')
})

app.use(compression())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(morgan(':date[clf] :method :url :status :response-time ms :referrer :remote-addr - :remote-user', { stream: accessLogStream }))
app.use(cookieParser())
app.use(setHeaders)
app.use(express.Router().get('/', loader))
app.use(express.static(resolve(__dirname, '../build')))
app.use(loader)

app.get('/auth/facebook', passport.authenticate('facebook'), (req, res) => {})
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signin' }), (req, res) => {
  res.redirect('/dashboard')
})
app.get('/auth/twitter', passport.authenticate('twitter'), (req, res) => {})
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/signin' }), (req, res) => {
  res.redirect('/dashboard')
})
app.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] }))
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signin' }), (req, res) => {
  res.redirect('/dashboard')
})
app.get('/socialSignout', (req, res) => {
  req.logout()
  res.redirect('/signed-out')
})

Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log(`Listening on port ${PORT}`))
})

app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw error
  }
})
