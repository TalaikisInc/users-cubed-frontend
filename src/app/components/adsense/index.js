import React from 'react'
import AdSense from 'react-adsense'

import { GOOGLE_PUB } from '../../../config'

export default ({ slot }) => (
  <AdSense.Google client={GOOGLE_PUB} slot={slot} />
)
