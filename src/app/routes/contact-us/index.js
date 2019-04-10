import React, { PureComponent } from 'react'
import isemail from 'isemail'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ContactForm from '../../components/contact-form'
import { DESCRIPTIONS } from '../../../config'
import contactApi from '../../utils/contact'

class ContactUs extends PureComponent {
  state = { loading: false }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const name = target[0].value
    const email = target[1].value
    const message = target[2].value
    if (isemail.validate(email) && name && name.length > 3 && message && message.length > 10) {
      contactApi(name, email, message, (res) => {
        if (res && res.error) {
          this.props.history.push({
            pathname: '/contact-us',
            state: { error: res.error }
          })
        } else if (res && res.status === 'OK.') {
          this.props.history.push({
            pathname: '/contact-us',
            state: { done: true, error: false }
          })
        }
      })
    } else {
      this.props.history.push({
        pathname: '/contact-us',
        state: { error: 'Please check the form.' }
      })
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { location } = this.props

    return (
      <Page title="Contact Us" description={DESCRIPTIONS.contactUs} path="/contact-us">
        { location.state && location.state.error ? <Error msg={location.state.error}/> : null }
        { location.state && location.state.done ? <Message>Thank you for your message, we'll respond ASAP.</Message>
          : <ContactForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

export default ContactUs
