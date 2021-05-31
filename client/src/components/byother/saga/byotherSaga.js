import {
  BYOTHER_DETAIL_LOADING_REQUEST,
  BYOTHER_DETAIL_LOADING_SUCCESS,
  BYOTHER_DETAIL_LOADING_FAILURE
} from "../../../redux/types";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

const loadQuestionsAPI = () => {
  return axios.get(`/api/byother/detail`);
}

function* loadQuestions () {
  try{
    const result = yield call(loadQuestionsAPI);
    
    yield put({
      type: BYOTHER_DETAIL_LOADING_SUCCESS,
      payload: result.data
    })

  }catch(e) {
    yield put({
      type: BYOTHER_DETAIL_LOADING_FAILURE,
      payload: e
    })
  }
}

function* watchLoadQuestion () {
  yield takeEvery(BYOTHER_DETAIL_LOADING_REQUEST, loadQuestions);
}
export default function* byotherSaga() {
  yield all([fork(watchLoadQuestion)]);
}
