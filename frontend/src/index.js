import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'

import reducers from './reducers'

import 'sanitize.css'
import './index.css'
import App from './App'

const store = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={ store(reducers) }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
)

