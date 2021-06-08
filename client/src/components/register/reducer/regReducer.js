import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../../../redux/types';

const initialState = {
    isRegistied: false,
};

const regReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            console.log('regReducer 발동 : REGISTER_REQUEST');
            return {
                ...state,
            };
        case REGISTER_SUCCESS:
            // console.log('Hi, regToken', state.token);
            console.log(action.payload, 'register_success');
            // localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                isRegistied: true,
            };
        case REGISTER_FAILURE:
            console.log('register_failure');
            // localStorage.removeItem("token");
            return {
                ...state,
                isRegistied: false,
            };
        default:
            return state;
    }
};

export default regReducer;
