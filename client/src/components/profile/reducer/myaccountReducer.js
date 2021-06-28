import {
    MYAC_RECEIVE_REQUEST,
    MYAC_RECEIVE_SUCCESS,
    MYAC_RECEIVE_FAILURE,
    MYAC_SEND_PREVPW_REQUEST,
    MYAC_SEND_PREVPW_SUCCESS,
    MYAC_SEND_PREVPW_FAILURE,
    MYAC_UPDATE_REQUEST,
    MYAC_UPDATE_SUCCESS,
    MYAC_UPDATE_FAILURE,
    MYAC_INIT,
} from '../../../redux/types';

const initalState = {
    isMyAccountReceive: false,
    isMyAccountPrevPwReceive: false,
    isMyAccountUpdate: false,
    payload: '',
};

const myacReducer = (state = initalState, action) => {
    switch (action.type) {
        case MYAC_RECEIVE_REQUEST:
            console.log('MyacDetailReducer 발동 : MYAC_REQ');
            return {
                ...state,
            };
        case MYAC_RECEIVE_SUCCESS:
            console.log(action.payload, 'Myac_Success');
            console.log('state값: ', state);
            return {
                ...state,
                isMyAccountReceive: true,
                payload: action.payload,
            };
        case MYAC_RECEIVE_FAILURE:
            console.log('Myac_failure');
            return {
                ...state,
                isMyAccountReceive: false,
            };
        case MYAC_SEND_PREVPW_REQUEST:
            console.log('MyacDetailReducer 발동 : MYAC_PREVPW_REQ');
            return {
                ...state,
            };
        case MYAC_SEND_PREVPW_SUCCESS:
            console.log(action.payload, 'Myac_PREVPW_Success');
            console.log('state값: ', state);
            return {
                ...state,
                isMyAccountPrevPwReceive: true,
                payload: action.payload,
            };
        case MYAC_SEND_PREVPW_FAILURE:
            console.log('Myac_PREVPW_failure');
            return {
                ...state,
                isMyAccountPrevPwReceive: false,
            };
        case MYAC_UPDATE_REQUEST:
            console.log('MyacDetailReducer 발동 : MYAC_UPDATE_REQ');
            return {
                ...state,
            };
        case MYAC_UPDATE_SUCCESS:
            console.log(action.payload, 'Myac_UPDATE_Success');
            console.log('state값: ', state);
            return {
                ...state,
                isMyAccountUpdate: true,
                payload: action.payload,
            };
        case MYAC_UPDATE_FAILURE:
            console.log('Myac_UPDATE_failure');
            return {
                ...state,
                isMyAccountUpdate: false,
            };
        case MYAC_INIT:
            return {
                isMyAccountReceive: false,
                isMyAccountPrevPwReceive: false,
                isMyAccountUpdate: false,
                payload: '',
            };
        default:
            return state;
    }
};

export default myacReducer;
