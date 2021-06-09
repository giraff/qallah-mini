import {
    BYOTHER_DETAIL_LOADING_REQUEST,
    BYOTHER_DETAIL_LOADING_SUCCESS,
    BYOTHER_DETAIL_LOADING_FAILURE,
    BYOTHER_UPLOAD_REQUEST,
    BYOTHER_UPLOAD_SUCCESS,
    BYOTHER_UPLOAD_FAILURE,
    BYOTHER_ANSWER_LOADING_REQUEST,
    BYOTHER_ANSWER_LOADING_SUCCESS,
    BYOTHER_ANSWER_LOADING_FAILURE,
} from '../../../redux/types';

const initialState = {
    questions: [],
    questionCount: '',
    questionDetail: '',
    questionSeq: '',
    isLoading: false,
    answers: '',
    answer: '',
    error: '',
};

const byotherReducer = (state = initialState, action) => {
    switch (action.type) {
        case BYOTHER_DETAIL_LOADING_REQUEST:
            return {
                ...state,
                questions: [],
                answers: [],
                questionDetail: '',
                questionSeq: '',
                isLoading: true,
            };
        case BYOTHER_DETAIL_LOADING_SUCCESS:
            console.log('DETAIL_LOAD_SUCCESS', action.payload.length);
            return {
                ...state,
                questions: action.payload,
                questionCount: action.payload.length,
                error: null,
                isLoading: false,
            };
        case BYOTHER_DETAIL_LOADING_FAILURE:
            console.log('DETAIL_LOAD_Failure');
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case BYOTHER_UPLOAD_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case BYOTHER_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                answers: action.payload.answerData,
            };
        case BYOTHER_UPLOAD_FAILURE:
            return {
                ...state,
                isLoading: false,
                answers: '',
                error: action.payload,
            };
        case BYOTHER_ANSWER_LOADING_REQUEST:
            return {
                ...state,
                isLoading: true,
                answer: '',
                error: '',
            };
        case BYOTHER_ANSWER_LOADING_SUCCESS:
            console.log('REDUCER', action);
            return {
                ...state,
                isLoading: false,
                answer: action.payload !== '' ? action.payload.answer_content : action.payload,
                error: '',
            };
        case BYOTHER_ANSWER_LOADING_FAILURE:
            return {
                ...state,
                isLoading: false,
                answer: '',
                error: action.payload,
            };
        default:
            return state;
    }
};
export default byotherReducer;
