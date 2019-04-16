import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { validate } from 'isemail'

import Page from '../../components/page'
import { t, setLocale } from '../../translations'
import { editUser, setError } from '../../../modules/auth'
import Error from '../../components/error'
import ProfileEditForm from '../../components/profile-edit-form'

class ProfileEdit extends PureComponent {
  state = { loading: false }

  componentWillMount () {
    const { params } = this.props.match
    if (params.locale) {
      setLocale(params.locale)
    }
  }

  submit (e) {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const email = target[0].value
    const firstName = target[1].value
    const lastName = target[2].value
    const phone = target[3].value
    const address = target[4].value
    const city = target[5].value    
    const country = target[6].value    
    const password = target[7].value
    if (validate(email)) {
      this.props.editUser({ email, firstName, lastName, phone, address, city, country, password })
    } else {
      this.props.setError(t('check_form'))
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { error, currentUser } = this.props

    return (
      <Page title={t('profile_edit')} noCrawl>
        { error ? <Error msg={error}/> : null }
        <ProfileEditForm handleSubmit={this.submit} loading={loading} currentUser={currentUser}/>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  editUser: (state) => dispatch(editUser(state)),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
