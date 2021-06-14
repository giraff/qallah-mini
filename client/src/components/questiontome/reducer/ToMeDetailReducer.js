import {
    TOME_REQUEST,
    TOME_SUCCESS,
    TOME_FAILURE,
    TOME_ANSWER_RECEIVE_REQUEST,
    TOME_ANSWER_RECEIVE_SUCCESS,
    TOME_ANSWER_RECEIVE_FAILURE,
    TOME_ANSWER_UPLOAD_REQUEST,
    TOME_ANSWER_UPLOAD_SUCCESS,
    TOME_ANSWER_UPLOAD_FAILURE,
} from '../../../redux/types';

const initialState = {
    isToMe: false,
    isToMeAnswerReceive: false,
    isToMeAnswerUpload: false,
    payload: '',
};

const tomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOME_REQUEST:
            console.log('ToMeDetailReducer 발동 : TOME_REQUEST');
            return {
                ...state,
            };
        case TOME_SUCCESS:
            // console.log('Hi, regToken', state.token);
            console.log(action.payload, 'ToMe_success');
            console.log('state값 : ', state);
            return {
                ...state,
                isToMe: true,
                payload: action.payload,
            };
        case TOME_FAILURE:
            console.log('ToMe_failure');
            // localStorage.removeItem("token");
            return {
                ...state,
                isToMe: false,
            };
        case TOME_ANSWER_RECEIVE_REQUEST:
            console.log('ToMeDetailReducer 발동 : TOME_ANSWER_RECEIVE_REQ');
            return {
                ...state,
            };
        case TOME_ANSWER_RECEIVE_SUCCESS:
            console.log(action.payload, 'TOME_ANSWER_RECEIVE_SUCCESS');
            return {
                ...state,
                isToMeAnswerReceive: true,
                payload: action.payload,
            };
        case TOME_ANSWER_RECEIVE_FAILURE:
            console.log('TOME_ANSWER_RECEIVE_FAILURE');
            return {
                ...state,
                isToMeAnswerReceive: false,
            };
        case TOME_ANSWER_UPLOAD_REQUEST:
            console.log('ToMeDetailReducer 발동: TOME_ANSWER_UPLOAD_REQ');
            return {
                ...state,
            };
        case TOME_ANSWER_UPLOAD_SUCCESS:
            console.log('ToMeDetailReducer 발동: TOME_ANSWER_UPLOAD_SUCCRESS');
            console.log('답변 입력 성공?', action.payload);
            return {
                ...state,
                isToMeAnswerUpload: true,
            };
        case TOME_ANSWER_UPLOAD_FAILURE:
            console.log('ToMeDetailReducer 발동: TOME_ANSWER_UPLOAD_FAILURE');
            return {
                ...state,
                isToMeAnswerUpload: false,
            };
        default:
            return state;
    }
};

export default tomeReducer;
