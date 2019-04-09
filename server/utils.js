export const extractAssets = (assets, chunks) => {
  return Object.keys(assets)
    .filter((asset) => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map((k) => assets[k])
}

export const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
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
