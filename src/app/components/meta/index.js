import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { TITLE, URL, FB_SITE, FB_APP_ID, TWITTER_HANDLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, IMAGES_URL } from '../../../config'

const Meta = ({ title, path, image, description, noCrawl, locale }) => {
  const pageProps = {
    path: typeof path === 'string' ? path : '',
    image: typeof image === 'string' ? `${IMAGES_URL}${image}` : `${IMAGES_URL}${DEFAULT_IMAGE}`,
    fullTitle: `${title} | ${TITLE}`,
    fullUrl: `${URL}${path}`,
    description: typeof description === 'string' ? description : DEFAULT_DESCRIPTION,
    locale: typeof locale === 'string' ? locale : 'en_US'
  }

  return (
    <Helmet>
      <title>{ pageProps.fullTitle }</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='canonical' href={pageProps.fullUrl} />
      { noCrawl ? <meta name='robots' content='noindex, nofollow' />
        : <meta name='robots' content='index, follow' />
      }
      <meta name='description' content={pageProps.description} />
      <meta property='og:title' content={pageProps.fullTitle} />
      <meta property='og:url' content={pageProps.fullUrl} />
      <meta property='og:type' content='company' />
      <meta property='og:description' content={pageProps.description} />
      <meta property='og:image' content={pageProps.image} />
      <meta property='og:locale' content='en_GB' />
      <meta property='og:site_name' content={FB_SITE} />
      <meta property='fb:app_id' content={FB_APP_ID} />
      <meta property='og:locale' content='pageProps.locale' />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:site' content={TWITTER_HANDLE} />
      <meta property='twitter:creator' content={TWITTER_HANDLE} />
      <meta property='twitter:title' content={pageProps.fullTitle} />
      <meta property='twitter:description' content={pageProps.description} />
      <meta property='twitter:url' content={pageProps.fullUrl} />
      <meta property='twitter:image:src' content={pageProps.image} />
      <meta property='twitter:handle' content={TWITTER_HANDLE} />
    </Helmet>
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
