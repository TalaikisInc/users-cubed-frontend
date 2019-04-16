import React, { PureComponent } from 'react'
import isemail from 'isemail'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ContactForm from '../../components/contact-form'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'
import { contact, setError } from '../../../modules/auth'

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
      this.props.contact({ name, email, message })
    } else {
      this.props.setError(t('check_form'))
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { error, status } = this.props

    return (
      <Page title={t('contact')} description={DESCRIPTIONS.contactUs} path="/contact-us">
        { error ? <Error msg={error}/> : null }
        { status ? <Message>{t('received')}</Message>
          : <ContactForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  status: state.auth.status
})

const mapDispatchToProps = (dispatch) => ({
  contact: (state) => dispatch(contact(state)),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)
