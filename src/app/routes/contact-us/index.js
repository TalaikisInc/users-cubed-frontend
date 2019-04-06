import React, { PureComponent } from 'react'
import { SubmissionError } from 'redux-form'

import ContactForm from '../../components/contact-form'

export default class ContactUs extends PureComponent {
  submit = (values) => {
    console.log(values)
  }

  render() {
    return <ContactForm onSubmit={this.submit} />
  }
}
