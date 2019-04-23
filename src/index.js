import React from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { Frontload } from 'react-frontload'
import { ConnectedRouter } from 'connected-react-router'
import createStore from './store'
// import { PersistGate } from 'redux-persist/integration/react'

import App from './app/app'
import './index.css'

const { store, persistor, history } = createStore()

const Application = (
  <Provider store={store}>
    <Frontload noServerRender={true}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Frontload>
  </Provider>
)

const root = document.querySelector('#root')

/*
persistor.subscribe(() => {
          const { bootstrapped } = persistor.getState();

          if (bootstrapped) {
              ReactDOM.hydrate(
                  <MyEntireApp />,
                  document.getElementById("appOrWhatever")
            );
          }
        });
*/

if (root.hasChildNodes() === true) {
  Loadable.preloadReady().then(() => {
    hydrate(Application, root)
  })
} else {
  persistor.subscribe(() => {
    const { bootstrapped } = persistor.getState()
    if (bootstrapped) {
      render(Application, root)
    }
  })
}
