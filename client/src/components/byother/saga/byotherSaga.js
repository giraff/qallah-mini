import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    BYOTHER_DETAIL_LOADING_REQUEST,
    BYOTHER_DETAIL_LOADING_SUCCESS,
    BYOTHER_DETAIL_LOADING_FAILURE,
    BYOTHER_UPLOAD_REQUEST,
    BYOTHER_UPLOAD_SUCCESS,
    BYOTHER_UPLOAD_FAILURE,
} from '../../../redux/types';

const loadQuestionsAPI = () => axios.get(`/api/byother/detail`);

function* loadQuestions() {
    try {
        const result = yield call(loadQuestionsAPI);

        yield put({
            type: BYOTHER_DETAIL_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: BYOTHER_DETAIL_LOADING_FAILURE,
            payload: e,
        });
    }
}

function* watchLoadQuestion() {
    yield takeEvery(BYOTHER_DETAIL_LOADING_REQUEST, loadQuestions);
}

/** BYOTHER UPLOAD  */
const uploadAnswerAPI = payload => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    const { token } = payload;

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post(`/api/byother/answer`, payload, config);
};

function* uploadAnswer(action) {
    console.log('UploadAnswer 리듀서');
    try {
        console.log(action);
        const result = yield call(uploadAnswerAPI, action.payload);

        yield put({
            type: BYOTHER_UPLOAD_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: BYOTHER_UPLOAD_FAILURE,
            payload: e,
        });
    }
}

function* watchUploadAnswer() {
    yield takeEvery(BYOTHER_UPLOAD_REQUEST, uploadAnswer);
}

export default function* byotherSaga() {
    yield all([fork(watchUploadAnswer), fork(watchLoadQuestion)]);
}
