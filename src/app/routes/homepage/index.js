import React, { PureComponent } from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'

class Homepage extends PureComponent {
  componentWillMount () {
    const { params } = this.props.match
    if (params.locale) {
      setLocale(params.locale)
    }
  }

  render () {
    return (
      <Page title={t('home')} description={DESCRIPTIONS.homepage} path="">
        <p>This is homepage.</p>
      </Page>
    )
  }
}

export default Homepage
