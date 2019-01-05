import io from 'socket.io-client'
import cfg from '../../configs'
import types from '../types'

const socket = io(cfg.url + ':' + cfg.port)

export default {
    initSocket() {
        return dispatch => {
            socket.on('connect', () => {
                console.log('Connected on client to socket')
            })
            dispatch({type: types.INIT_SOCKET, payload: socket})
        };
    },
    connectUser(user) {
        return dispatch => {
            socket.emit(types.USER_CONNECTED, user)
            dispatch({type: types.USER_CONNECTED, payload: user})
        }
    },
    logoutUser() {
        return dispatch => {
            socket.emit(types.USER_LOGOUT)
            dispatch({type: types.USER_LOGOUT, payload: null})
        }
    }
}