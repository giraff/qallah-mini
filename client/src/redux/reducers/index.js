import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import regReducer from './regReducer'

const createRootReducer = (history) => combineReducers({
  // combineReducer는 redux store 내부의 여러 상태를 가진 리듀서를 관리하기 위해 사용
  // 반환값 : reducer 함수
  router: connectRouter(history),
  reg: regReducer
})

export default createRootReducer;