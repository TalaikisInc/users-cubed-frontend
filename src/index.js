import 'react-app-polyfill/ie11'
import React from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { Frontload } from 'react-frontload'
import { ConnectedRouter } from 'connected-react-router'

import createStore from './store'

import App from './app/app'
import './index.css'
const { store, history } = createStore()

const Application = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Frontload noServerRender={true}>
        <App />
      </Frontload>
    </ConnectedRouter>
  </Provider>
);

const root = document.querySelector('#root');

if (root.hasChildNodes() === true) {
  Loadable.preloadReady().then(() => {
    hydrate(Application, root);
  });
} else {
  render(Application, root);
}
