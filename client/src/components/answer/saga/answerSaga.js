import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
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

/** ANSWER LOADING */
const answerLoadingAPI = token => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.get('/api/answer/answertest', config);
};

function* answerLoading(action) {
    try {
        const result = yield call(answerLoadingAPI, action.payload);

        console.log('answerLoading => ', result.data);

        const newArr = result.data ? [...new Set(result.data.map(answer => answer.YEAR))] : [];

        const body = {
            answers: result.data ? result.data : '',
            currentYear: newArr !== [] ? newArr[newArr.length - 1] : '',
        };

        yield put({
            type: ANSWER_LOAD_SUCCESS,
            payload: body,
        });
    } catch (e) {
        yield put({
            type: ANSWER_LOAD_FAILURE,
            payload: e.response,
        });
    }
}

function* watchAnswerLoading() {
    yield takeEvery(ANSWER_LOAD_REQUEST, answerLoading);
}

// answer year set
function* answerYearSet(action) {
    try {
        yield put({
            type: ANSWER_YEAR_SET_SUCCESS,
            payload: action.payload,
        });
    } catch (e) {
        yield put({
            type: ANSWER_YEAR_SET_FAILURE,
            payload: e.response,
        });
    }
}

function* watchAnswerYearSetting() {
    yield takeEvery(ANSWER_YEAR_SET_REQUEST, answerYearSet);
}

const answerDetailLoadAPI = body => {
    const { token } = body;
    console.log(body);

    const { year, month, day, type } = body;
    const obj = { year, month, day, type };
    const config = {
        headers: {
            'Content-type': 'application/json',
        },

        params: {
            info: obj,
        },
    };
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios('/api/answer/detail', config);
};
// answer Detail Load
function* answerDetailLoad(action) {
    const result = yield call(answerDetailLoadAPI, action.payload);
    try {
        yield put({
            type: ANSWER_DETAIL_LOAD_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: ANSWER_DETAIL_LOAD_FAILURE,
            payload: e.response,
        });
    }
}

function* watchAnswerDetailLoading() {
    yield takeEvery(ANSWER_DETAIL_LOAD_REQUEST, answerDetailLoad);
}

export default function* answerSaga() {
    yield all([fork(watchAnswerLoading), fork(watchAnswerYearSetting), fork(watchAnswerDetailLoading)]);
}
