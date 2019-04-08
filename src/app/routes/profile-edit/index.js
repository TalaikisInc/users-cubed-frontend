import React from 'react'
import { connect } from 'react-redux'

import Page from '../../components/page'

const ProfileEdit = ({ currentUser }) => (
  <Page title="Dashboard" noCrawl>
    <p>
      <b>Name:</b> {currentUser.firstName}
    </p>
    <p>
      <b>Email:</b> {currentUser.email}
    </p>
    <p>
      <b>Password:</b> {currentUser.password}
    </p>
  </Page>
)

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, null)(ProfileEdit)
