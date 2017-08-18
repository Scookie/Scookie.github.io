import req from './req'
import http from '../utils/http'

export default {
    login(user) {
        return http.post(req.LOGIN, user)
    },
}
