import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubmissionError } from 'redux-form'

import Page from '../../components/page'
import { loginUser } from '../../../modules/auth'

const Signin = (props) => (
  <Page id="signin" title="Signin" description="We need to log in to stuff." path="/signin">
    <button onClick={() => props.loginUser('user@mydomain.com', 'password123')}>
      Click the button...
    </button>
  </Page>
)

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ loginUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signin)

/*
export default class Signup extends React.Component {
  submit = values => {
    // print the form values to the console
    console.log(values)
  }
  render() {
    return <ContactForm onSubmit={this.submit} />
  }
}

*/
