import React, { PureComponent } from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'

class About extends PureComponent {
  componentWillMount () {
    const { params } = this.props.match
    if (params.locale) {
      setLocale(params.locale)
    }
  }

  render () {
    return (
      <Page title={t('about')} description={DESCRIPTIONS.about} path="/about">
        <p>What we're all about</p>
      </Page>
    )
  }
}

export default About
