import io from 'socket.io-client'
import axios from 'axios'
import cfg from '../../configs'
import types from '../types'

const api = cfg.url + ':' + cfg.port
const socket = io(api)

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
    },
    authenticate(email, password) {
        return dispatch => {

            const token = localStorage.getItem("token")

            axios.post(`${api}/auth`, { email, password, token })
                .then((response) => {
                    if (response.data.error) {
                        dispatch({type: types.USER_ERROR, payload: response.data})
                        return false
                    }

                    if (token !== response.data.token) {
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("email", response.data.email)
                    } 
                    dispatch({type: types.USER_AUTHENTICATED, payload: response.data})
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }
    },
    verify() {

        const token = localStorage.getItem("token")
        const email = localStorage.getItem("email")

        return dispatch => {
            axios.post(`${api}/verify`, { token, email })
                .then((response) => {
                    if (response.data.error) {
                        dispatch({type: types.USER_ERROR, payload: response.data})
                        return false
                    }

                    if (token !== response.data.token) {
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("email", response.data.email)
                    }
                    dispatch({type: types.USER_VERIFIED, payload: response.data})
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }
    }
}