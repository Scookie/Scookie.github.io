import React from 'react'
import { Route, IndexRoute } from 'react-router'

import asyncComponent from './async'

import Container from './pages/container'
import Index from './pages/example/index'
import Login from './pages/user/login'

import { authRouter } from './interceptor'

// ======= 动态加载 =======
const Test = asyncComponent(() => import('./pages/test')
.then(module => module.default), { name: 'testPage' })

export default (
    <Route path="/" component={Container}>
        <Route path="/login" component={Login} />
        <IndexRoute component={Index} />
        <Route path="/index" component={Index} onEnter={authRouter} />
        <Route path="/test" component={Test} />
    </Route>
)
