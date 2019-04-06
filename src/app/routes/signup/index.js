import React, { PureComponent } from 'react'
import { SubmissionError } from 'redux-form'

import SignupForm from '../../components/signup-form'

export default class Signup extends PureComponent {
  submit = (values) => {
    console.log(values)
  }

  render() {
    return <SignupForm onSubmit={this.submit} />
  }
}
