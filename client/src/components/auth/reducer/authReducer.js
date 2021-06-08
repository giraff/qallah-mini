import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    CLEAR_ERROR_FAILURE,
} from '../../../redux/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: '',
    userName: '',
    errorMsg: '',
};

// reducing function
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            };
        case LOGIN_SUCCESS:
            console.log('Hi, token', state.token);
            console.log(action.payload, 'login_success');
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                userName: action.payload.user.name,
                errorMsg: '',
            };
        case LOGOUT_FAILURE:
        case LOGIN_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: false,
                token: null,
                userName: null,
                errorMsg: action.payload.data.msg,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                token: null,
                isLoading: false,
                isAuthenticated: false,
                userName: null,
                user: null,
                errorMsg: '',
            };
        case USER_LOADING_REQUEST:
            console.log('authReducer 발동 : USER_LOADING_REQUEST');
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADING_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                userName: action.payload.user_name,
            };
        case USER_LOADING_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            };
        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
            };
        case CLEAR_ERROR_SUCCESS: // 에러를 모두 날려보낸다
            return {
                ...state,
                errorMsg: '',
            };
        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: 'Clear Error Fail',
            };
        default:
            return state;
    }
};

export default authReducer;
