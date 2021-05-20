import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../types';

const initialState = {
    token: localStorage.getItem("token"),
    isRegistied: null,
    isLoading: false,
    user: "",
    userName: "",
}

const regReducer = (state= initialState, action) => {
    switch(action.type) {
        case REGISTER_REQUEST:
            console.log('regReducer 발동 : REGISTER_REQUEST');
            return {
                ...state,
                isLoading: true
            }
        case REGISTER_SUCCESS:
            console.log('Hi, regToken', state.token);
            console.log(action.payload, 'register_success');
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isRegistied: true,
                userName: action.payload.user.name,
            }
        case REGISTER_FAILURE:
            console.log('register_failure');
            localStorage.removeItem("token");
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isRegistied: false,
                userName: null
            }
        default:
            return state
    }
}

export default regReducer;