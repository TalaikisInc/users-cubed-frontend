import React from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'

const Homepage = () => (
  <Page title="Homepage" description={DESCRIPTIONS.homepage} path="">
    <p>This is homepage.</p>
  </Page>
)

export default Homepage
