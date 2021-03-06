import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t } from '../../../translations'
import { setLanguage, getLanguage, setError } from '../../../modules/auth'

class About extends PureComponent {
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
    const { locale } = this.props

    return (
      <Page title={t('about')} description={DESCRIPTIONS.about} path="/about" locale={locale}>
        <p>What we're all about</p>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.auth.locale
})

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: () => dispatch(getLanguage()),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
