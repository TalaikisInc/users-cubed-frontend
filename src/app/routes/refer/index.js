import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { validate } from 'isemail'

import Page from '../../components/page'
import ReferForm from '../../components/refer-form'
import Error from '../../components/error'
import Message from '../../components/message'
import { DESCRIPTIONS } from '../../../config'
import { refer, setError, setLanguage, getLanguage } from '../../../modules/auth'
import { t } from '../../../translations'

class Refer extends PureComponent {
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
    const email = target[0].value
    if (validate(email)) {
      this.props.refer({ to: email })
    } else {
      this.props.setError(t('check_form'))
    }
  }

  render () {
    const { error, loading, referStatus } = this.props

    return (
      <Page title={t('refer')} description={DESCRIPTIONS.refer} path="/refer">
        { error ? <Error>{error}</Error> : null }
        { referStatus ? <Message>{t('referred')}</Message> : null }
        <ReferForm handleSubmit={this.submit} loading={loading} />
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  referStatus: state.auth.referStatus,
  loading: state.auth.loading
})

const mapDispatchToProps = (dispatch) => ({
  refer: (state) => dispatch(refer(state)),
  setError: (state) => dispatch(setError(state)),
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: () => dispatch(getLanguage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Refer)
