import {
    REFL_INIT,
    REFL_REQUEST,
    REFL_SUCCESS,
    REFL_FAILURE,
    REFL_ANSWER_RECEIVE_REQUEST,
    REFL_ANSWER_RECEIVE_SUCCESS,
    REFL_ANSWER_RECEIVE_FAILURE,
    REFL_ANSWER_UPLOAD_REQUEST,
    REFL_ANSWER_UPLOAD_SUCCESS,
    REFL_ANSWER_UPLOAD_FAILURE,
} from '../../../redux/types';

const initialState = {
    isRefl: false,
    isReflAnswerReceive: false,
    isReflAnswerUpload: false,
    payload: '',
};

const reflReducer = (state = initialState, action) => {
    switch (action.type) {
        case REFL_REQUEST:
            console.log('REFLDetailReducer 발동 : REFL_REQUEST');
            return {
                ...state,
            };
        case REFL_SUCCESS:
            // console.log('Hi, regToken', state.token);
            console.log(action.payload, 'REFL_success');
            console.log('state값 : ', state);
            return {
                ...state,
                isRefl: true,
                payload: action.payload,
            };
        case REFL_FAILURE:
            console.log('REFL_failure');
            // localStorage.removeItem("token");
            return {
                ...state,
                isRefl: false,
            };
        case REFL_ANSWER_RECEIVE_REQUEST:
            console.log('REFLDetailReducer 발동 : REFL_ANSWER_RECEIVE_REQ');
            return {
                ...state,
                isReflAnswerReceive: false,
            };
        case REFL_ANSWER_RECEIVE_SUCCESS:
            console.log(action.payload, 'REFL_ANSWER_RECEIVE_SUCCESS');
            return {
                ...state,
                isReflAnswerReceive: true,
                payload: action.payload,
            };
        case REFL_ANSWER_RECEIVE_FAILURE:
            console.log('REFL_ANSWER_RECEIVE_FAILURE');
            return {
                ...state,
                isReflAnswerReceive: false,
            };
        case REFL_ANSWER_UPLOAD_REQUEST:
            console.log('REFLDetailReducer 발동: REFL_ANSWER_UPLOAD_REQ');
            return {
                ...state,
            };
        case REFL_ANSWER_UPLOAD_SUCCESS:
            console.log('REFLDetailReducer 발동: REFL_ANSWER_UPLOAD_SUCCRESS');
            console.log('답변 입력 성공?', action.payload);
            return {
                ...state,
                isReflAnswerUpload: true,
            };
        case REFL_ANSWER_UPLOAD_FAILURE:
            console.log('REFLDetailReducer 발동: REFL_ANSWER_UPLOAD_FAILURE');
            return {
                ...state,
                isReflAnswerUpload: false,
            };
        case REFL_INIT:
            console.log('REFLDetail State를 초기화 합니다.');
            return {
                isRefl: false,
                isReflAnswerReceive: false,
                isReflAnswerUpload: false,
                payload: '',
            };
        default:
            return state;
    }
};

export default reflReducer;
