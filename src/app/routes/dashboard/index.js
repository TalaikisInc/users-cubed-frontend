import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Page from '../../components/page'
import Error from '../../components/error'
import { t } from '../../../translations'
import { getUser, setError, getLanguage, setLanguage } from '../../../modules/auth'
import { isServer } from '../../../store'

class Dashboard extends PureComponent {
  componentWillMount () {
    this.props.setError(null)
    const { params } = this.props.match
    if (params.locale) {
      this.props.setLanguage(params.locale)
    } else {
      this.props.getLanguage()
    }

    if (!isServer) {
      this.props.getUser()
    }
  }

  render () {
    const { currentUser, error } = this.props

    return (
      <Page title={t('dashboard')} noCrawl>
        { error ? <Error msg={error}/> : null }
        <p><b>Email:</b> {currentUser.email}</p>
        <p><strong><Link to="/profile-edit">Edit Profile</Link></strong></p>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  error: state.auth.error
})

const mapDispatchToProps = (dispatch) => ({
  getUser: (state) => dispatch(getUser(state)),
  setError: (state) => dispatch(setError(state)),
  getLanguage: (state) => dispatch(getLanguage(state)),
  setLanguage: (state) => dispatch(setLanguage(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
