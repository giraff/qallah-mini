import {
    TOME_REQUEST,
    TOME_SUCCESS,
    TOME_FAILURE,
  } from "../../../redux/types";
  import { all, call, fork, put, takeEvery } from "redux-saga/effects";
  import axios from "axios";
  
  /** ToMeDetail : 서버와 통신 필요함 */
  const ToMeDetailAPI = (ToMeData) => {
    console.log("ToMeDetailAPI 발동 -> axios.post 요청 보냄");
    console.log(ToMeData, "ToMeDetail/ToMeData");
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // server측으로 post 요청 (express가 받고 router 처리)
    return axios.get("/api/tome/detail", ToMeData, config);
  };
  
  function* ToMeDetail(action) {
    console.log("ToMeDetail(action) 발동");
    try {
      // ToMeDetailAPI에 action.payload를 인자로 보내면서 실행 -> axios.get 결과 받아옴
      const result = yield call(ToMeDetailAPI, action.payload);
      console.log("api/tome/detail 에서 받아온 결과값",result);
      yield put({
        type: TOME_SUCCESS,
        // server/routes/tome/detail에서 res 에 넘긴 {user} 객체 data를 payload로 보냄
        payload: result.data,
      });
    } catch (e) {
      // try 문 중간에 에러 발생 시 TOME_FAILURE로 상태 변화 요청하고 에러 보냄
      yield put({
        type: TOME_FAILURE,
        payload: e.response,
      });
    }
  }
  // RegUser 감시 함수 : TOME_REQUEST를 기다렸다가 오면 regUser 함수 실행
  function* watchToMeDetail() {
    console.log("ToMeDetailSaga 발동, TOME_REQ");
    yield takeEvery(TOME_REQUEST, ToMeDetail);
  }
  
  export default function* ToMeDetailSaga() {
    yield all([fork(watchToMeDetail)]);
  }