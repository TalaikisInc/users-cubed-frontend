import React, { PureCompoennt } from 'react'

import clasifier from './clasifier'
import { UPLOAD_API_URL } from '../../../config'

class Upload extends PureCompoennt {
  constructor (props) {
    super(props)
    this.onUpload = this.onUpload.bind(this)
  }

  onUpload () {
    clasifier()
  }

  render () {
    return (
      <form action={UPLOAD_API_URL} method='post' encType="multipart/form-data">
        <div className="form-group">
          <input type="file" data-role="file" name="image" />
        </div>
        <div className="form-group">
          <button className="button success">Sign In</button>
        </div>
      </form>
    )
  }
}

export default Upload
