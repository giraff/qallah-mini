import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
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

/** EXPERIENCE LOAD */
const experienceLoadAPI = token => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.get('api/experience', config);
};

function* experienceLoad(action) {
    try {
        const result = yield call(experienceLoadAPI, action.payload);

        yield put({
            type: EXPERIENCE_LOAD_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: EXPERIENCE_LOAD_FAILURE,
            payload: e.response,
        });
    }
}

function* watchExperienceLoad() {
    console.log('ExperienceLoad 발동');
    yield takeEvery(EXPERIENCE_LOAD_REQUEST, experienceLoad);
}

/** EXPERIENCE UPLOAD */
const experienceUploadAPI = data => {
    console.log('업로드 API에 넘어온 값 => ', data);
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    const { token } = data;
    console.log('업로드 API에 넘어온 token => ', token);
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post('api/experience/upload', data, config);
};

function* experienceUpload(action) {
    console.log('experience Upload [Saga] => ', action.payload);
    try {
        const result = yield call(experienceUploadAPI, action.payload);
        console.log('EXPERIENCE_UPLOAD_SUCCESS[SAGA]', result);
        yield put({
            type: EXPERIENCE_UPLOAD_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: EXPERIENCE_UPLOAD_FAILURE,
            payload: e.response,
        });
    }
}

function* watchExperienceUpload() {
    console.log('ExperienceLoad 발동');
    yield takeEvery(EXPERIENCE_UPLOAD_REQUEST, experienceUpload);
}

function* clearError() {
    try {
        yield put({
            type: EXPR_CLEAR_ERROR_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: EXPR_CLEAR_ERROR_FAILURE,
        });
    }
}

function* watchexprClearError() {
    yield takeEvery(EXPR_CLEAR_ERROR_REQUEST, clearError);
}

export default function* experienceSaga() {
    yield all([fork(watchExperienceLoad), fork(watchExperienceUpload), fork(watchexprClearError)]);
}
