import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'

import Meta from '../meta'

class Page extends Component {
  render () {
    const { children, id, className, ...rest } = this.props

    return (
      <Fragment>
        <Meta {...rest} />
        { children }
      </Fragment>
    )
  }
}

export default withRouter(Page)
