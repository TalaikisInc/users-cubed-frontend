import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Page from '../../components/page'
import { t, setLocale } from '../../translations'

class Dashboard extends PureComponent {
  render () {
    return (
      <Page title={t('dashboard')} noCrawl>
        <p>
          <b>Email:</b> {this.props.currentUser.email}
        </p>
        <p>
          <b>Password:</b> {this.props.currentUser.password}
        </p>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, null)(Dashboard)
