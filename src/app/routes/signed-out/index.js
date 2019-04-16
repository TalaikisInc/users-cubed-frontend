import React, { PureComponent } from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import Error from '../../components/error'
import { t, setLocale } from '../../translations'

class SignedOut extends PureComponent {
  componentWillMount () {
    const { params } = this.props.match
    if (params.locale) {
      setLocale(params.locale)
    }
  }

  render () {
    const { error } = this.props

    return (
      <Page title={t('signed_out')} description={DESCRIPTIONS.signedOut} path="/signed-out">
        { error ? <Error msg={error}/> : <p>{t('signed_out_text')}</p> }
      </Page>
    )
  }
}

export default SignedOut
