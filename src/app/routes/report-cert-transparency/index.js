import React, { PureComponent } from 'react'
import isemail from 'isemail'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ContactForm from '../../components/contact-form'
import { DESCRIPTIONS } from '../../../config'
import { t } from '../../../translations'
import { contact, setError, setLanguage, getLanguage } from '../../../modules/auth'

class ReportCertTransparency extends PureComponent {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    this.props.setError(null)
    const { params } = this.props.match
    if (params.locale) {
      this.props.setLanguage(params.locale)
    } else {
      this.props.getLanguage()
    }
  }

  submit (e) {
    e.preventDefault()
    const { target } = e
    const name = target[0].value
    const email = target[1].value
    const message = target[2].value
    if (isemail.validate(email) && name && name.length > 3 && message && message.length > 10) {
      this.props.contact({ name, email, message })
    } else {
      this.props.setError(t('check_form'))
    }
  }

  render () {
    const { error, contactStatus, loading } = this.props

    return (
      <Page title={t('report_cert_transparency')} description={DESCRIPTIONS.contactUs} path="/report-cert-transparency">
        { contactStatus ? <Message>{t('received')}</Message>
          : <ContactForm handleSubmit={this.submit} loading={loading} />
        }
        { error ? <Error>{error}</Error> : null }
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  contactStatus: state.auth.contactStatus,
  loading: state.auth.loading
})

const mapDispatchToProps = (dispatch) => ({
  contact: (state) => dispatch(contact(state)),
  setError: (state) => dispatch(setError(state)),
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: (state) => dispatch(getLanguage(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportCertTransparency)
