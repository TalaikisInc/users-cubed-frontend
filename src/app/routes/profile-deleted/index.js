import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t } from '../../../translations'
import { setLanguage, getLanguage } from '../../../modules/auth'

class ProfileDeleted extends PureComponent {
  componentWillMount () {
    const { params } = this.props.match
    if (params.locale) {
      this.props.setLanguage(params.locale)
    } else {
      this.props.getLanguage()
    }
  }

  render () {
    return (
      <Page title={t('profile_deleted')} description={DESCRIPTIONS.profile.deleted} path="/profile-deleted">
        <p>{t('profile_deleted_text')} {t('now_signup')}<Link to="/signup">{t('signup')}</Link></p>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.auth.locale
})

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: (state) => dispatch(getLanguage(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDeleted)
