import 'react-app-polyfill/ie11'
import React from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { Frontload } from 'react-frontload'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'

import createStore from './store'
import App from './app/app'
import { unregister } from './serviceWorker'
import './index.css'
const { store, history, persistor } = createStore()

const Application = (
  <Provider store={store}>
    <PersistGate loading="loading" persistor={persistor}>
      <ConnectedRouter history={history}>
        <Frontload noServerRender={true}>
          <App />
        </Frontload>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
)

unregister()
const root = document.querySelector('#root')

if (root.hasChildNodes() === true) {
  Loadable.preloadReady().then(() => {
    hydrate(Application, root)
  })
} else {
  render(Application, root)
}
