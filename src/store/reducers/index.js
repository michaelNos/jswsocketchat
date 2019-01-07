import types from '../types'

const initialState = {
    socket: null,
    user: {},
    users: [],
    room: [],
    loading: false,
    verified: false,
    messages: [],
    message: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INIT_SOCKET:
            return {
                ...state,
                socket: action.payload
            }
        case types.USER_CONNECTED:
            return {
                ...state,
                user: action.payload
            }
        case types.CONNECTED_USERS:
            return {
                ...state,
                users: action.payload
            }
        case types.ROOM_CREATED:
            return {
                ...state,
                room: action.payload
            }
        case types.MESSAGE_SENT:
            return {
                ...state,
                message: action.payload
            }
        case types.MESSAGE_RECIEVED:
            return {
                ...state,
                messages: action.payload
            }
        case types.USER_AUTHENTICATED:
            return {
                ...state,
                user: action.payload
            }
        case types.USER_VERIFIED:
            return {
                ...state,
                user: action.payload,
                verified: true
            }
        case types.USER_ERROR:
            return {
                ...state,
                user: action.payload
            }
        case types.USER_LOGOUT:
            return {
                ...state,
                user: action.payload
            }
        case types.LOADING_START:
            return {
                ...state,
                loading: true
            }   
        case types.LOADING_END:
            return {
                ...state,
                loading: false
            }          
        default:
            return state;
    }
}