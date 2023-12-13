import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store'

import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <ErrorBoundary fallback="Something went wrong. Please try again later.">
        <App />
      </ErrorBoundary>
    </Router>
  </Provider>,
)

