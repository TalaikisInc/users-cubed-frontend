import React from 'react'

import Page from '../../components/page'
import { t, setLocale } from '../../translations'

const NotFound = () => (
  <Page path="/not-found" title="Not Found" noCrawl>
    <p>We can't find anything like this.</p>
  </Page>
)

export default NotFound
