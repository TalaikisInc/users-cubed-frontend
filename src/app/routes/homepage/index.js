import React from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'

const Homepage = () => (
  <Page title={t('home')} description={DESCRIPTIONS.homepage} path="">
    <p>This is homepage.</p>
  </Page>
)

export default Homepage
