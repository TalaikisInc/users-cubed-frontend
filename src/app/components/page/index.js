import React, { PureComponent, Fragment } from 'react'
import { withRouter } from 'react-router'

import Meta from '../meta'

class Page extends PureComponent {
  render () {
    const { children, ...rest } = this.props

    return (
      <Fragment>
        <Meta {...rest} />
        { children }
      </Fragment>
    )
  }
}

export default withRouter(Page)
