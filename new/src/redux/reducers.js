// Main Reducer
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'

import { project } from './modules/project'

const rootReducer = combineReducers({
    routing,
    project,
})

export default rootReducer
