import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { validate } from 'isemail'

import Page from '../../components/page'
import { t } from '../../translations'
import { editUser, setError, setLanguage, getLanguage } from '../../../modules/auth'
import Error from '../../components/error'
import ProfileEditForm from '../../components/profile-edit-form'

class ProfileEdit extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
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
    this.setState({ loading: true })
    const { target } = e
    const email = target[0].value
    const firstName = target[1].value
    const lastName = target[2].value
    const dob = target[3].value
    const dialCode = target[4].value
    const phone = target[5].value
    const address = target[6].value
    const city = target[7].value
    const zipCode = target[8].value
    const country = target[9].value
    const password = target[10].value
    if (validate(email)) {
      this.props.editUser({ email, firstName, lastName, dob, phone, address, city, country, password, dialCode, zipCode })
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
  setError: (state) => dispatch(setError(state)),
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: (state) => dispatch(getLanguage(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
