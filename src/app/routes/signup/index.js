import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Page from '../../components/page'
import SignupForm from '../../components/signup-form'
import { DESCRIPTIONS } from '../../../config'
import api from '../../utils/api'
import { setError } from '../../../modules/error'

class Signup extends PureComponent {
  state = {
    loading: false,
    error: ''
  }

  submit (e) {
    e.preventDefault()
    const { target } = e
    const email = target[0].value
    const password = target[1].value
    const tosAgreement = target[3].value
    if (email && password && tosAgreement) {
      const res = api({
        action: 'USER_CREATE',
        email,
        password,
        tosAgreement
      })
    } else {
      setError('Please check the form.')
    }
  }

  render () {
    return (
      <Page title="Signup" description={DESCRIPTIONS.signup} path="/signup">
        <SignupForm handleSubmit={this.submit} loading={this.state.loading} />
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.error
})

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ setError }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
