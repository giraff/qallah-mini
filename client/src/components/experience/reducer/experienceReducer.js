import {
    EXPERIENCE_LOAD_REQUEST,
    EXPERIENCE_LOAD_SUCCESS,
    EXPERIENCE_LOAD_FAILURE,
    EXPERIENCE_UPLOAD_REQUEST,
    EXPERIENCE_UPLOAD_SUCCESS,
    EXPERIENCE_UPLOAD_FAILURE,
    EXPR_CLEAR_ERROR_REQUEST,
    EXPR_CLEAR_ERROR_SUCCESS,
    EXPR_CLEAR_ERROR_FAILURE,
} from '../../../redux/types';

const initialState = {
    isLoading: false,
    isUploaded: false,
    experience: [],
    errorMsg: '',
};

const experienceReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXPERIENCE_LOAD_REQUEST:
            console.log('experience LOAD 시도 중...');
            return {
                ...state,
                isLoading: true,
                isUploaded: false,
                errorMsg: '',
            };
        case EXPERIENCE_LOAD_SUCCESS:
            console.log('experience LOAD 성공 =>', action.payload);
            return {
                ...state,
                isLoading: false,
                experience: action.payload,
                isUploaded: false,
                errorMsg: '',
            };
        case EXPERIENCE_LOAD_FAILURE:
            console.log('experience LOAD 실패 =>', action.payload);
            return {
                ...state,
                isLoading: false,
                isUploaded: false,

                experience: [],
                errorMsg: action.payload.data,
            };
        case EXPERIENCE_UPLOAD_REQUEST:
            console.log('experience 업로드 시도 중...');
            return {
                ...state,
                isLoading: true,
                isUploaded: false,
                errorMsg: '',
            };
        case EXPERIENCE_UPLOAD_SUCCESS:
            console.log('experience 업로드 성공 =>', action.payload);
            return {
                ...state,
                isLoading: false,
                isUploaded: true,
                errorMsg: '',
            };
        case EXPERIENCE_UPLOAD_FAILURE:
            console.log('experience 업로드 실패 =>', action.payload.data);
            return {
                ...state,
                isLoading: false,
                isUploaded: false,
                errorMsg: action.payload.data.msg,
            };
        case EXPR_CLEAR_ERROR_REQUEST:
            return {
                ...state,
            };
        case EXPR_CLEAR_ERROR_SUCCESS: // 에러를 모두 날려보낸다
            return {
                ...state,
                errorMsg: '',
            };
        case EXPR_CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: 'Clear Error Fail',
            };
        default:
            return state;
    }
};

export default experienceReducer;
