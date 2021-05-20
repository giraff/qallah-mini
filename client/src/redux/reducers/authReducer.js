import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: "",
  userName: "",
  errorMsg: ""
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      console.log('2. authReducer 발동 : LOGIN_REQUEST');
      return {
        ...state,
        errorMsg: "",
        isLoading: true
      }
    case LOGIN_SUCCESS:
      console.log('Hi, token', state.token);
      console.log(action.payload, 'login_success');
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
        userName: action.payload.user.name,
        errorMsg: "",
      }
    case LOGIN_FAILURE:
      console.log('login_failure');
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        userName: null,
        errorMsg: action.payload.data.msg
      }
    default:
      return state
  }
}

export default authReducer;