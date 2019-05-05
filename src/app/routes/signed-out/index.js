import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import Error from '../../components/error'
import { t } from '../../../translations'
import { setLanguage, getLanguage, setError } from '../../../modules/auth'

class SignedOut extends PureComponent {
  componentWillMount () {
    this.props.setError(null)
    const { params } = this.props.match
    if (params.locale) {
      this.props.setLanguage(params.locale)
    } else {
      this.props.getLanguage()
    }
  }

  render () {
    const { error, locale } = this.props

    return (
      <Page title={t('signed_out')} description={DESCRIPTIONS.signedOut} path="/signed-out" locale={locale}>
        { error ? <Error>{error}</Error> : <p>{t('signed_out_text')} {t('now_sign')}<Link to="/signin">{t('signin')}</Link></p> }
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  locale: state.auth.locale
})

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: () => dispatch(getLanguage()),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignedOut)
