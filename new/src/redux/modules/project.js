const GET_PROJECT = 'GET_PROJECT'

const defaultProject = {
    id: 100000,
    name: 'DTStack React Starter Kit',
}

// Action
export function getProject() {
    return {
        type: GET_PROJECT,
        data: defaultProject,
    }
}

// Reducer
export function project(state = defaultProject, action) {
    switch (action.type) {
    case GET_PROJECT:
        return action.data
    default:
        return state
    }
}
