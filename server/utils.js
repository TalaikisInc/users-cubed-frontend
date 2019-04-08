export const extractAssets = (assets, chunks) => {
  Object.keys(assets)
    .filter((asset) => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map((k) => assets[k])
}

export const extraChunks = (manifest, modules) => {
  return extractAssets(manifest, modules).map(
    (c) => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
  )
}
