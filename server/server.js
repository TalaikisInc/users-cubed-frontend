import { resolve } from 'path'
import express from 'express'
import morgan from 'morgan'
import Loadable from 'react-loadable'
import rateLimit from 'express-rate-limit'
import rfs from 'rotating-file-stream'

import loader from './loader'
import setHeaders from './headers'
const app = express()
const PORT = process.env.PORT || 3000
let server

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: resolve(__dirname, '../.logs')
})

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // per window
})

app.use(morgan(':date[clf] :method :url :status :response-time ms :referrer :remote-addr - :remote-user', { stream: accessLogStream }))
app.use(setHeaders)
app.use(express.Router().get('/', loader))
app.use(express.static(resolve(__dirname, '../build')))
app.use(loader)
app.use(limiter)

Loadable.preloadAll().then(() => {
  server = app.listen(PORT, console.log(`App listening on port ${PORT}!`))
})

app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      break
    default:
      throw error
  }
})

function stop () {
  if (server) {
    server.close()
  }
}

module.exports = app
module.exports.stop = stop
