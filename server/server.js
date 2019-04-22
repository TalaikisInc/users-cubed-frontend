import { resolve } from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import Loadable from 'react-loadable'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import rfs from 'rotating-file-stream'

import loader from './loader'
import setHeaders from './headers'
const app = express()
const PORT = process.env.PORT || 3000

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: resolve(__dirname, '../.logs')
})

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // per window
})

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(':date[clf] :method :url :status :response-time ms :referrer :remote-addr - :remote-user', { stream: accessLogStream }))
app.use(cookieParser())
app.use(setHeaders)
app.use(express.Router().get('/', loader))
app.use(express.static(path.resolve(__dirname, '../build')))
app.use(loader)
app.use(limiter)

Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log(`App listening on port ${PORT}!`))
})

app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1)
      break
    default:
      throw error
  }
})
