let history

if (typeof document !== 'undefined') {
  const { createBrowserHistory } = require('history')
  history = createBrowserHistory()
}

export default history
