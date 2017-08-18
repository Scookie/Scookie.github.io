import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

const configureStore = process.env.NODE_ENV === 'production'
? require('./config.prod') : require('./config.dev')

const store = configureStore.default();
const history = syncHistoryWithStore(browserHistory, store);

export {
    store,
    history,
}
