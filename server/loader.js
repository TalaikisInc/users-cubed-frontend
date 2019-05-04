import { resolve } from 'path'
import { readFile } from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { Frontload, frontloadServerRender } from 'react-frontload'
import Loadable from 'react-loadable'

import createStore from '../src/store'
import App from '../src/app/app'
import manifest from '../build/asset-manifest.json'

export default (req, res) => {
  if (/google|bing|msn|duckduckbot|facebot|facebookexternalhit|slurp|yandex/i.test(req.headers['user-agent'])) {
    const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
      data = data.replace('<html>', `<html ${html}>`)
      data = data.replace(/<title>.*?<\/title>/g, title)
      data = data.replace('</head>', `${meta}</head>`)
      data = data.replace(
        '<div id="root"></div>',
        `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
      )
      data = data.replace('</body>', scripts.join('') + '</body>')
      return data
    }

    readFile(resolve(__dirname, '../build/index.html'), 'utf8', (err, htmlData) => {
      if (err) {
        console.error('Read error', err)
        return res.status(404).end()
      }

      const { store } = createStore(req.url)
      const context = {}
      const modules = []

      frontloadServerRender(() => {
        renderToString(
          <Loadable.Capture report={m => modules.push(m)}>
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <Frontload isServer={true}>
                  <App />
                </Frontload>
              </StaticRouter>
            </Provider>
          </Loadable.Capture>
        )
      }).then(routeMarkup => {
        if (context.url) {
          res.writeHead(302, {
            Location: context.url
          })
          res.end()
        } else {
          const extractAssets = (assets, chunks) =>
            Object.keys(assets)
              .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
              .map(k => assets[k])

          const extraChunks = extractAssets(manifest, modules).map(
            c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
          )

          const helmet = Helmet.renderStatic();

          // console.log('TITLE', helmet.title.toString());
          // console.log('BODY', routeMarkup);

          const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            body: routeMarkup,
            scripts: extraChunks,
            state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
          })

          res.send(html)
        }
      })
    })
  } else {
    readFile(resolve(__dirname, '../build/index.html'), 'utf8', (err, htmlData) => {
      if (err) {
        console.error('Read error', err)
        return res.status(404).end()
      }
      res.send(htmlData)
    })
  }
}
