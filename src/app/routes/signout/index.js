import { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { signoutUser } from '../../../modules/auth'

class Signout extends PureComponent {
  componentWillMount () {
    this.props.signoutUser()
    this.props.history.push('/')
  }

  render () {
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ signoutUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signout)
