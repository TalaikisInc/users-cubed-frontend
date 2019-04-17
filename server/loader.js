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
import { getUser, signoutUser } from '../src/modules/auth'
import { injectHTML, extractAssets } from './utils'
import { STORAGE_ID } from '../src/config'

export default (req, res) => {
  readFile(resolve(__dirname, '../build/index.html'), 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Read error', err)
      return res.status(404).end()
    }

    const { store } = createStore(req.url)

    if (typeof localStorage.getItem(`${STORAGE_ID}_token`) === 'string') {
      store.dispatch(getUser())
    } else {
      store.dispatch(signoutUser())
    }

    const context = {}
    const modules = []

    frontloadServerRender(() => {
      renderToString(<Loadable.Capture report={(m) => modules.push(m)}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Frontload isServer={true}>
              <App />
            </Frontload>
          </StaticRouter>
        </Provider>
      </Loadable.Capture>)
    }).then((routeMarkup) => {
      if (context.url) {
        res.writeHead(302, { Location: context.url })
        res.end()
      } else {
        const extraChunks = extractAssets(manifest, modules).map(
          (c) => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
        )

        const helmet = Helmet.renderStatic()

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
}
