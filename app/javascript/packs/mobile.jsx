import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'

import {loadState, saveState} from '../components/localStorage'
import App from '../mobile/App'
import reducers from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState()
const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(throttle(()=> {
    saveState({
        calendarSettings: store.getState().calendarSettings
    })
}, 1000))

ReactDOM.render(<Provider store={store}><App/></Provider>, document.querySelector("#root"))