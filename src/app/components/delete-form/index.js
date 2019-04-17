import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Submit from '../submit'
import Form from '../form'
import Error from '../error'
import { deleteUser } from '../../../modules/auth'

class DeleteForm extends PureComponent {
  state = { loading: false, modal: false }

  handleSubmit (e) {
    e.preventDefault()
    // @FIXME
    // this.setState({ loading: true, modal: false })
    this.props.deleteUser()
    // this.setState({ loading: false })
  }

  onClick () {
    // this.setState({ modal: false })
  }

  render () {
    const { loading, modal } = this.state
    const { error } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        { error ? <Error msg={error}/> : null }
        <Submit label="Delete account" loading={loading} color='danger' />
        { modal ? <div class="modal">
          <div class="modal-background"></div>
            <div class="modal-content">
              <h4 class="title is-4">Are you sure?</h4>
              <button class="is-large is-danger" onClick={this.handleSubmit} />
            </div>
            <button class="modal-close is-large" aria-label="close" onClick={() => this.onClick} />
        </div>
        : null }
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error
})

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (state) => dispatch(deleteUser(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteForm)
