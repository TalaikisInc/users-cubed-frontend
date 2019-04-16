import React from 'react'

import Page from '../../components/page'
import { t, setLocale } from '../../translations'

const NotFound = () => (
  <Page path="/not-found" title={t('not_found')} noCrawl>
    <p>{t('not_found_text')}</p>
  </Page>
)

export default NotFound
