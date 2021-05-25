import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "../components/auth/reducer/authReducer";
import regReducer from "../components/register/reducer/regReducer";

// combineReducer는 redux store 내부의 여러 상태를 가진 리듀서를 관리하기 위해 사용
// 반환값 : reducer 함수
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    reg: regReducer,
  });

export default rootReducer;
