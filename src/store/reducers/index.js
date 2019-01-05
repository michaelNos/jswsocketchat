import types from '../types'

const initialState = {
    socket: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INIT_SOCKET:
            return {
                ...state,
                socket: action.payload
            }
        default:
            return state;
    }
}