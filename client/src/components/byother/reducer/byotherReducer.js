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
    BYOTHER_DETAIL_DELETE_REQUEST,
    BYOTHER_DETAIL_DELETE_SUCCESS,
    BYOTHER_DETAIL_DELETE_FAILURE,
} from '../../../redux/types';

const initialState = {
    isLoading: false,
    answer: '',
    error: '',
};

const byotherReducer = (state = initialState, action) => {
    switch (action.type) {
        case BYOTHER_DETAIL_LOADING_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case BYOTHER_DETAIL_LOADING_SUCCESS:
            console.log('DETAIL_LOAD_SUCCESS', action.payload.length);
            return {
                ...state,
                isLoading: false,
                error: '',
            };
        case BYOTHER_DETAIL_LOADING_FAILURE:
            console.log('DETAIL_LOAD_Failure');
            return {
                ...state,
                isLoading: false,
                error: action.payload.data.msg,
            };
        case BYOTHER_UPLOAD_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case BYOTHER_UPLOAD_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                isLoading: false,
                error: '',
            };
        case BYOTHER_UPLOAD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.data.msg,
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
                answer: action.payload === '' ? '' : action.payload.answer_content,
                error: '',
            };
        case BYOTHER_ANSWER_LOADING_FAILURE:
            return {
                ...state,
                isLoading: false,
                answer: '',
                error: action.payload,
            };
        case BYOTHER_DETAIL_DELETE_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case BYOTHER_DETAIL_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
            };
        case BYOTHER_DETAIL_DELETE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.data.msg,
            };
        default:
            return state;
    }
};
export default byotherReducer;
