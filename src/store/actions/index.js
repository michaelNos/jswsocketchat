import io from 'socket.io-client'
import cfg from '../../configs'
import types from '../types'

export default {
    initSocket() {
        return dispatch => {
            const socket = io(cfg.url + ':' + cfg.port)
            socket.on('connect', () => {
                console.log('Connected on client to socket')
            })
            dispatch({type: types.INIT_SOCKET, payload: socket})
        };
    }
}