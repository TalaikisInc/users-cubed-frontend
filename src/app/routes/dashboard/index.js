import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Page from '../../components/page'
import Error from '../../components/error'
import { t } from '../../../translations'
import { getUser, setError, getLanguage, setLanguage } from '../../../modules/auth'
import { isServer } from '../../../store'
import Loader from '../../components/loader'

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
        { error ? <Error>{error}</Error> : null }
        { !currentUser.email ? <Loader loading />
          : <Fragment>
            <p><b>Email:</b> {currentUser.email}</p>
            <p><b>First name:</b> {currentUser.firstName}</p>
            <p><b>Last name:</b> {currentUser.lastName}</p>
            <p><b>Phone:</b> {currentUser.dialCoode} {currentUser.phone}</p>
            <p><b>Address:</b> {currentUser.address}</p>
            <p><b>ZIP Code:</b> {currentUser.zipCode}</p>
            <p><b>City:</b> {currentUser.city}</p>
            <p><b>Country:</b> {currentUser.country}</p>
            <p><b>Date of Birth:</b> {currentUser.dob}</p>
            <p><b>Avatar:</b> {currentUser.avatarUrl}</p>
            <p><strong><Link to="/profile-edit">Edit Profile</Link></strong></p>
          </Fragment>
        }
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
