import React from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t } from '../../translations'

const About = () => (
  <Page title={t('about')} description={DESCRIPTIONS.about} path="/about">
    <p>What we're all about</p>
  </Page>
)

export default About
