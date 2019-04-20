import { isServer } from '../store'

export default () => {
  if (!isServer && window && window.navigator) {
    return window.navigator.userAgent
  }

  return 'none'
}
