/**
 * [interceptor Http请求拦截，如果无权限的情况，或者登陆失效的情况，跳转登录页。]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
import { browserHistory } from 'react-router'

import localDb from './utils/localDb'

function isLogin() {
    return localDb.get('session')
}

export function authHttp(response) {
    switch (response.status) {
    case 401: // 该状态码根据实际情况调整
        localDb.clear()
        browserHistory.replace('/login')
        return Promise.reject(response);
    case 200:
        return response;
    default:
        /* eslint-disable */
        if (process.env.NODE_ENV !== 'production') {
            console.error('Request error: ', response.status, response.statusText)
        }
        return response
        /* eslint-enable */
    }
}

// 路由拦截
export function authRouter(next, replace) {
    const path = next.location.pathname
    if (isLogin() || path.indexOf('login') > -1) {
        replace(null, path)
    } else {
        replace('/login')
    }
}
