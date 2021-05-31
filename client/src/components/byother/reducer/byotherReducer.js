import {
  BYOTHER_DETAIL_LOADING_REQUEST,
  BYOTHER_DETAIL_LOADING_SUCCESS,
  BYOTHER_DETAIL_LOADING_FAILURE
} from "../../../redux/types";

const initialState = {
  questions: [],
  questionCount: "",
  questionDetail: "",
  questionSeq: "",
  isLoading: false,
  error: ""
};

const byotherReducer = (state = initialState, action) => {
  switch(action.type) {
    case BYOTHER_DETAIL_LOADING_REQUEST:

      return{
        ...state,
        questions:[],
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
    default:
      return state;
  }
}
export default byotherReducer;