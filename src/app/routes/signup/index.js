import React, { PureComponent } from 'react'

import Page from '../../components/page'
import SignupForm from '../../components/signup-form'
import { DESCRIPTIONS } from '../../../config'

export default class Signup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { loading: false }
    this.submit = this.submit.bind(this)
  }

  submit = (values) => {
    console.log(values)
  }

  render() {
    return (
      <Page title="Signup" description={DESCRIPTIONS.signup} path="/signup">
        <SignupForm handleSubmit={this.submit} loading={this.state.loading} />
      </Page>
    )
  }
}
