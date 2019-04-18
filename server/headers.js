import { URL } from '../src/config'

export default (req, res, done) => {
  res.setHeader('Surrogate-Control', 'no-store')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('X-Download-Options', 'noopen')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none')
  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload')
  res.setHeader('X-DNS-Prefetch-Control', 'on')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('X-XSS-Protection', `1; report=${URL}xss-report`)
  res.setHeader('X-Frame-Options', 'deny')
  res.setHeader('Content-Security-Policy', 'script-src "self"')
  res.setHeader('Expect-CT:', `max-age=2592000, enforce, report-uri="${URL}report-cert-transparency"`)
  res.setHeader('Content-Type', 'application/json')
  done()
}
