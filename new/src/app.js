import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import routers from './routers'
import { store, history } from './redux'

import './assets/css/comm.css'
import './assets/css/reset.css'
import './styles/main.scss'

ReactDOM.render(
    <Provider store={store} >
        <Router routes={routers} history={history} />
    </Provider>
    , document.getElementById('app'),
)
