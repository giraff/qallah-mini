import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
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
const uploadAnswerAPI = data => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    const { token, page } = data;

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.post(`/api/byother/detail/answer/${page}`, data, config);
};

function* uploadAnswer(action) {
    try {
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

/** BYOTHER ANSWER LOAD  */
const loadAnswerAPI = data => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    const { token, page } = data;

    console.log(data);
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.get(`/api/byother/answer/${parseInt(page, 10)}`, config);
};

function* loadAnswer(action) {
    try {
        console.log('saga도착', action);
        const result = yield call(loadAnswerAPI, action.payload);
        console.log('loadAnswer', result);
        yield put({
            type: BYOTHER_ANSWER_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: BYOTHER_ANSWER_LOADING_FAILURE,
            payload: e,
        });
    }
}

function* watchLoadAnswer() {
    yield takeEvery(BYOTHER_ANSWER_LOADING_REQUEST, loadAnswer);
}

export default function* byotherSaga() {
    yield all([fork(watchUploadAnswer), fork(watchLoadQuestion), fork(watchLoadAnswer)]);
}
