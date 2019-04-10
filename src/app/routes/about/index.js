import React from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'

const About = () => (
  <Page title="About" description={DESCRIPTIONS.about} path="/about">
    <p>What we're all about</p>
  </Page>
)

export default About
