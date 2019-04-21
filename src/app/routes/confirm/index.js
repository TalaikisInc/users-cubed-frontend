import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ConfirmForm from '../../components/confirm-form'
import { DESCRIPTIONS } from '../../../config'
import { t } from '../../../translations'
import { confirm, setError, setLanguage, getLanguage } from '../../../modules/auth'

class Confirm extends PureComponent {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    this.props.setError(null)
    const { params } = this.props.match
    const token = params.token
    if (token && token.length === 64) {
      this.props.confirm({ token })
    }

    if (params.locale) {
      this.props.setLanguage(params.locale)
    } else {
      this.props.getLanguage()
    }
  }

  submit = (e) => {
    e.preventDefault()
    const { target } = e
    const token = target[0].value
    if (token && token.length === 64) {
      this.props.confirm({ token })
    } else {
      this.props.setError(t('check_form'))
    }
  }

  render () {
    const { error, confirmStatus, loading } = this.props

    return (
      <Page title={t('confirm_title')} description={DESCRIPTIONS.confirm} path="/confirm">
        { error ? <Error>{error}</Error> : null }
        { confirmStatus ? <Message>{t('confirmed')}<Link to="/signin">{t('signin')}</Link>.</Message>
          : <ConfirmForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  confirmStatus: state.auth.confirmStatus,
  loading: state.auth.loading
})

const mapDispatchToProps = (dispatch) => ({
  confirm: (state) => dispatch(confirm(state)),
  setError: (state) => dispatch(setError(state)),
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: (state) => dispatch(getLanguage(state)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
