import {
  BYOTHER_DETAIL_LOADING_REQUEST,
  BYOTHER_DETAIL_LOADING_SUCCESS,
  BYOTHER_DETAIL_LOADING_FAILURE,
  BYOTHER_UPLOAD_REQUEST,
  BYOTHER_UPLOAD_SUCCESS,
  BYOTHER_UPLOAD_FAILURE
} from "../../../redux/types";

const initialState = {
  questions: [],
  questionCount: "",
  questionDetail: "",
  questionSeq: "",
  isLoading: false,
  answers : [],
  error: ""
};

const byotherReducer = (state = initialState, action) => {
  switch(action.type) {
    case BYOTHER_DETAIL_LOADING_REQUEST:
      return{
        ...state,
        questions:[],
        answers: [],
        questionDetail: "",
        questionSeq:"",
        isLoading: true
      }
    case BYOTHER_DETAIL_LOADING_SUCCESS:
      console.log('DETAIL_LOAD_SUCCESS',action.payload.length);
      return {
        ...state,
        questions: action.payload,
        questionCount: action.payload.length,
        error: null,
        isLoading: false
      }
    case BYOTHER_DETAIL_LOADING_FAILURE:
      console.log('DETAIL_LOAD_Failure');
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case BYOTHER_UPLOAD_REQUEST:
    case BYOTHER_UPLOAD_SUCCESS:
    case BYOTHER_UPLOAD_FAILURE:
    default:
      return state;
  }
}
export default byotherReducer;