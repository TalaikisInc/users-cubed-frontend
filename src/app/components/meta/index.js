import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { TITLE, URL, FB_SITE, FB_APP_ID, TWITTER_HANDLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE } from '../../../config'

const Meta = ({ title, path, image, description, noCrawl, locale }) => {
  const pageProps = {
    path: typeof path === 'string' ? path : '',
    image: typeof image === 'string' ? image : DEFAULT_IMAGE,
    fullTitle: `${title} | ${TITLE}`,
    fullUrl: `${URL}${path}`,
    imageUrl: `${URL}static/images/${image}`,
    description: typeof description === 'string' ? description : DEFAULT_DESCRIPTION,
    locale: typeof locale === 'string' ? locale : 'en_GB'
  }

  const getMetaTags = (pageProps) => {
    const metaTags = [
      { itemprop: 'name', content: pageProps.fullTitle },
      { itemprop: 'description', content: pageProps.description },
      { itemprop: 'image', content: pageProps.image },
      { name: 'robots', content: 'index, follow' },
      { name: 'description', content: pageProps.description },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: TWITTER_HANDLE },
      { name: 'twitter:title', content: pageProps.fullTitle },
      { name: 'twitter:description', content: pageProps.description },
      { name: 'twitter:creator', content: TWITTER_HANDLE },
      { name: 'twitter:handle', content: TWITTER_HANDLE },
      { name: 'twitter:image:src', content: pageProps.imageUrl },
      { name: 'twitter:url', content: pageProps.fullUrl },
      { property: 'og:title', content: pageProps.fullTitle },
      { property: 'og:type', content: 'company' },
      { property: 'og:url', content: pageProps.fullUrl },
      { property: 'og:image', content: pageProps.imageUrl },
      { property: 'og:description', content: pageProps.description },
      { property: 'og:site_name', content: FB_SITE },
      { property: 'fb:app_id', content: FB_APP_ID },
      { property: 'og:locale', content: pageProps.locale }
    ]

    if (noCrawl) {
      delete metaTags[3]
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' })
    }

    return metaTags
  }

  return (
    <Helmet>
          <title>{ pageProps.fullTitle }</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='canonical' href={pageProps.fullUrl} />
          <meta name='robots' content='index, follow' />
          <meta name='description' content={pageProps.description} />
          <meta property='og:title' content={pageProps.fullTitle} />
          <meta property='og:url' content={pageProps.fullUrl} />
          <meta property='og:type' content='company' />
          <meta property='og:description' content={pageProps.description} />
          <meta property='og:image' content={pageProps.imageUrl} />
          <meta property='og:locale' content='en_GB' />
          <meta property='og:site_name' content={FB_SITE} />
          <meta property='fb:app_id' content={FB_APP_ID} />
          <meta property='twitter:title' content={pageProps.fullTitle} />
          <meta property='twitter:description' content={pageProps.description} />
          <meta property='twitter:url' content={pageProps.fullUrl} />
          <meta property='twitter:image' content={pageProps.imageUrl} />
          <meta property='twitter:handle' content={TWITTER_HANDLE} />
        </Helmet>
    /*<Helmet
      htmlAttributes={{
        lang: 'en'
      }}
      title={pageProps.fullTitle}
      link={[
        { rel: 'canonical', href: pageProps.fullUrl }
      ]}
    meta={getMetaTags(pageProps)} />*/
  )
}

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  noCrawl: PropTypes.bool
}

export default Meta
