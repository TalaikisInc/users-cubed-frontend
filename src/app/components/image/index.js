import React from 'react'
import lqip from 'lqip.macro'
import IdealImage from 'react-ideal-image'

const Image = ({ image, width, height }) => {
  const lq = lqip(image)
  return (
    <IdealImage
      placeholder={lq}
      srcSet={[{ src: image, width }]}
      alt="doggo"
      width={width}
      height={height} />
  )
}

export default Image
