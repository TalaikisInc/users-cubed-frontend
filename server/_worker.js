import Helmet from 'react-helmet'

import manifest from '../build/asset-manifest.json'
import { injectHTML } from './utils'

const doJob = async (req, routeMarkup, store, modules, htmlData, manifest, done) => {
  if (routeMarkup) {
    console.log(req)
    const extractAssets = (assets, chunks) => Object.keys(assets).filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1).map(k => assets[k])

    const extraChunks = extractAssets(manifest, modules).map(
      c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
    )

    const helmet = Helmet.renderStatic()

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

    done(html)
  }
}

process.on('message', async (msg) => {
  process.send({ value: await doJob(msg.routeMarkup, msg.store, msg.modules, (e) => console.log(e)), event: msg.event })
})
