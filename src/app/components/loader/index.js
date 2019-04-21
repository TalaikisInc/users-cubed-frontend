import React from 'react'
import { BounceLoader } from 'react-spinners'
import { css } from '@emotion/core'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

export default ({ loading }) => (
  <BounceLoader
    css={override}
    sizeUnit={'px'}
    size={50}
    color={'#123abc'}
    loading={loading} />
)
