import { MYAC_RECEIVE_REQUEST, MYAC_RECEIVE_SUCCESS, MYAC_RECEIVE_FAILURE } from '../../../redux/types';

const initalState = {
    isMyAccountReceive: false,
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
        default:
            return state;
    }
};

export default myacReducer;
