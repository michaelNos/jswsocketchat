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
    connectedUsers() {
        return dispatch => {
            socket.on(types.CONNECTED_USERS, (users) => {
                dispatch({type: types.CONNECTED_USERS, payload: users})
            })
        }
    },
    createChat(otherUser, currentUser) {
        let chat = {otherUser, currentUser}

        return dispatch => {
            socket.emit(types.CHAT_CREATED, chat)
            dispatch({type: types.CHAT_CREATED, payload: chat})
        }
    },
    createRoom() {
        return dispatch => {
            socket.on(types.ROOM_CREATED, (room) => {
                dispatch({type: types.ROOM_CREATED, payload: room})
            })
        }
    },
    sendMessage(message, sender) {
        return dispatch => {
            socket.emit(types.MESSAGE_SENT, {message, sender})
            dispatch({type: types.MESSAGE_SENT, payload: message})
        }
    },
    messageRecived() {
        return dispatch => {
            socket.on(types.MESSAGE_RECIEVED, (messages) => {
                dispatch({type: types.MESSAGE_RECIEVED, payload: messages})
            })
        }
    },
    logOut() {
        return dispatch => {
            socket.emit(types.USER_LOGOUT, localStorage.getItem("email"))
            localStorage.removeItem("token")
            localStorage.removeItem("email")
            dispatch({type: types.USER_LOGOUT})
        }
    },
    authenticate(email, password) {
        return dispatch => {

            const token = localStorage.getItem("token")
            dispatch({type: types.LOADING_START})

            axios.post(`${api}/auth`, { email, password, token })
                .then((response) => {
                    if (response.data.error) {
                        dispatch({type: types.USER_ERROR, payload: response.data})
                        dispatch({type: types.LOADING_END})
                        return false
                    }

                    if (token !== response.data.token) {
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("email", response.data.email)
                    } 
                    dispatch({type: types.USER_AUTHENTICATED, payload: response.data})
                    dispatch({type: types.LOADING_END})
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }
    },
    verify() {
        return dispatch => {

            dispatch({type: types.LOADING_START})
            const token = localStorage.getItem("token")
            const email = localStorage.getItem("email")

            if (token && email) {
                axios.post(`${api}/verify`, { token, email })
                .then((response) => {
                    if (response.data.error) {
                        dispatch({type: types.USER_ERROR, payload: response.data})
                        dispatch({type: types.LOADING_END})
                        return false
                    }

                    if (token !== response.data.token) {
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("email", response.data.email)
                    }
                    dispatch({type: types.USER_VERIFIED, payload: response.data})
                    dispatch({type: types.LOADING_END})
                    
                })
                .catch((err) => {
                    throw new Error(err);
                });
            } else {
                dispatch({type: types.LOADING_END})
            }
        }
    }
}