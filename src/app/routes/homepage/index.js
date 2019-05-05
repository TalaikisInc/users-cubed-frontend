import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t } from '../../../translations'
import { setLanguage, getLanguage, setError } from '../../../modules/auth'

class Homepage extends PureComponent {
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
      <Page title={t('home')} description={DESCRIPTIONS.homepage} path="" locale={locale}>
        <p>This is demo for <a href="https://github.com/TalaikisInc/users-cubed-s3">Users Cubed S3</a> and <a href="https://github.com/TalaikisInc/users-cubed-frontend">Users Cubed Frontend</a>.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
