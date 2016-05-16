import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import {createStore, combineReducers} from 'redux'
import {reducer as formReducer, reduxForm} from 'redux-form'

import RegistrationForm from './components/RegistrationForm'

const reducers = {
  form: formReducer,
}

const reducer = combineReducers(reducers)
const store = createStore(reducer)

ReactDOM.render(
 <Provider store={store}>
  <div className="container">
    <RegistrationForm />
  </div>
 </Provider>,
  document.getElementById('main')
)
