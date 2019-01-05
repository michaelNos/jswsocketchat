import types from '../types'

const initialState = {
    socket: null,
    user: null
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
        case types.USER_LOGOUT:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}