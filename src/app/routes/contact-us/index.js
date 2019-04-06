import React, { PureComponent } from 'react'

import ContactForm from '../../components/contact-form'

export default class ContactUs extends PureComponent {
  state = {
    loading: false
  }

  submit = (values) => {
    console.log(values)
  }

  render() {
    return <ContactForm handleSubmit={this.submit} loading={this.state.loading} />
  }
}
