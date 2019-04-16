import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ConfirmForm from '../../components/confirm-form'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'
import { confirm, setError } from '../../../modules/auth'

class Confirm extends PureComponent {
  state = { loading: false, token: null }

  componentWillMount () {
    const token = this.props.match.params.token
    if (token && token.length === 64) {
      this.props.confirm(token)
    }
  }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const token = target[0].value
    if (token && token.length === 64) {
      this.props.confirm({ token })
    } else {
      this.props.setError(t('check_form'))
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { error, status } = this.props

    return (
      <Page title={t('confirm_title')} description={DESCRIPTIONS.confirm} path="/confirm">
        { error ? <Error msg={error}/> : null }
        { status ? <Message>{t('confirmed')}<Link to="/signin">{t('signin')}</Link>.</Message>
          : <ConfirmForm handleSubmit={this.submit} loading={loading} />
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
  confirm: (state) => dispatch(confirm(state)),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
