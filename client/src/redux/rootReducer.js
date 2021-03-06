import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from '../components/auth/reducer/authReducer';
import regReducer from '../components/register/reducer/regReducer';
import ToMeDetailReducer from '../components/questiontome/reducer/ToMeDetailReducer';
import byotherReducer from '../components/byother/reducer/byotherReducer';
import reflReducer from '../components/reflection/reducer/reflectionDetailReducer';
import myacReducer from '../components/profile/reducer/myaccountReducer';
import experienceReducer from '../components/experience/reducer/experienceReducer';
import answerReducer from '../components/answer/reducer/answerReducer';

// combineReducer는 redux store 내부의 여러 상태를 가진 리듀서를 관리하기 위해 사용
// 반환값 : reducer 함수
const rootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        reg: regReducer,
        tomedetail: ToMeDetailReducer,
        byother: byotherReducer,
        refl: reflReducer,
        myac: myacReducer,
        experience: experienceReducer,
        answer: answerReducer,
    });

export default rootReducer;
