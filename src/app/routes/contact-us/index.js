import React, { PureComponent } from 'react'

import ContactForm from '../../components/contact-form'
import Page from '../../components/page'

class ContactUs extends PureComponent {
  state = {
    loading: false
  }

  submit = (values) => {
    console.log(values)
  }

  render() {
    return (
      <Page title="Contact Us" path="/contact-us">
        <ContactForm handleSubmit={this.submit} loading={this.state.loading} />
      </Page>
    )
  }
}

export default ContactUs
