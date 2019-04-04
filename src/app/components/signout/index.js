import React from 'react'

const logout = () => {
  /*
    if (auth.signedIn()) {
      auth.logout()
      redirect(this.props.res, '/signed-out')
    }
  */
}

export default () => (
  <li className="brand no-hover">
    <button className="button rounded" onClick={logout}><span className="mif-exit"></span> Sign Out</button>
  </li>
)
