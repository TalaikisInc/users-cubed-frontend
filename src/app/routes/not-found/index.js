import React, { PureComponent } from 'react'

import Page from '../../components/page'
import { t, setLocale } from '../../translations'

class NotFound extends PureComponent {
  componentWillMount () {
    const { params } = this.props.match
    if (params.locale) {
      setLocale(params.locale)
    }
  }

  render () {
    return (
      <Page path="/not-found" title={t('not_found')} noCrawl>
        <p>{t('not_found_text')}</p>
      </Page>
    )
  }
}

export default NotFound
