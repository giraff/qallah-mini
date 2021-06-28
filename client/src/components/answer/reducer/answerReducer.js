import {
    ANSWER_LOAD_REQUEST,
    ANSWER_LOAD_SUCCESS,
    ANSWER_LOAD_FAILURE,
    ANSWER_YEAR_SET_REQUEST,
    ANSWER_YEAR_SET_SUCCESS,
    ANSWER_YEAR_SET_FAILURE,
    ANSWER_DETAIL_LOAD_REQUEST,
    ANSWER_DETAIL_LOAD_SUCCESS,
    ANSWER_DETAIL_LOAD_FAILURE,
} from '../../../redux/types';

const initialState = {
    isLoading: false,
    errorMsg: '',
    answers: '',
    currentYear: '',
    answerDetail: '',
};

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ANSWER_YEAR_SET_REQUEST:
        case ANSWER_LOAD_REQUEST:
        case ANSWER_DETAIL_LOAD_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMsg: '',
            };
        case ANSWER_LOAD_SUCCESS:
            console.log('Answer Load Success =>', action.payload);
            return {
                ...state,
                isLoading: false,
                errorMsg: '',
                answers: action.payload.answers,
                // currentYear: action.payload.currentYear,
            };
        case ANSWER_LOAD_FAILURE:
            return {
                ...state,
                isLoading: false,
                answers: '',
                errorMsg: action.payload.data.msg,
            };
        case ANSWER_YEAR_SET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentYear: action.payload,
                errorMsg: '',
            };
        case ANSWER_YEAR_SET_FAILURE:
            return {
                ...state,
                isLoading: false,
                currentYear: '',
                errorMsg: action.payload.data.msg,
            };
        case ANSWER_DETAIL_LOAD_SUCCESS:
            console.log('detail load success => ', action.payload);
            return {
                ...state,
                isLoading: false,
                errorMsg: '',
                answerDetail: action.payload,
            };
        case ANSWER_DETAIL_LOAD_FAILURE:
            return {
                ...state,
                isLoading: false,
                answerDetail: '',
                errorMsg: action.payload.data.msg,
            };
        default:
            return {
                ...state,
            };
    }
};

export default answerReducer;
