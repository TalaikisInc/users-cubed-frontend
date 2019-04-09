import { join, resolve } from 'path'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import Loadable from 'react-loadable'
import cookieParser from 'cookie-parser'
import rfs from 'rotating-file-stream'

import loader from './loader'
const app = express()
const PORT = 3000
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: join(__dirname, '../.logs')
})

app.use(compression())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(morgan(':date[clf] :method :url :status :response-time ms :referrer :remote-addr - :remote-user', { stream: accessLogStream }))
app.use(cookieParser())

app.use(express.Router().get('/', loader))
app.use(express.static(resolve(__dirname, '../build')))
app.use(loader)

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
