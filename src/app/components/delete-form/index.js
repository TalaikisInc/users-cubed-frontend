import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import Submit from '../submit'
import Form from '../form'
import { deleteUser } from '../../../modules/auth'

class DeleteForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      modal: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({ loading: true, modal: false })
    this.props.deleteUser()
    this.setState({ loading: false })
  }

  close () {
    this.setState({ modal: false })
  }

  open (e) {
    e.preventDefault()
    this.setState({ modal: true })
  }

  render () {
    const { loading, modal } = this.state
    const _class = modal ? 'modal is-active' : 'modal'

    return (
      <Fragment>
        <Form onSubmit={this.open}>
          <Submit label="Delete account" loading={loading} color='danger' />
        </Form>
        <div className="container">
          <div className={_class}>
            <div className="modal-background"></div>
            <div className="modal-content has-background-white has-text-centered">
              <div className="box">
                <h4 className="title is-4">Are you sure?</h4>
                <p>This action is not reversible.</p>
                <button className="button is-danger is-rounded" onClick={this.handleSubmit}>
                  Yes, delete
                </button>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={this.close} />
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error
})

const mapDispatchToProps = (dispatch) => ({
  deleteUser: () => dispatch(deleteUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteForm)
