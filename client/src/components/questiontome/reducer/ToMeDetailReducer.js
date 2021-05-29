import {
    TOME_REQUEST,
    TOME_SUCCESS,
    TOME_FAILURE,
  } from "../../../redux/types";
  
  const initialState = {
    isToMe: false,
    payload: ""
  };
  
  const tomeReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOME_REQUEST:
        console.log("ToMeDetailReducer 발동 : TOME_REQUEST");
        return {
          ...state,
        };
      case TOME_SUCCESS:
        // console.log('Hi, regToken', state.token);
        console.log(action.payload, "ToMe_success");
        console.log("state값 : ",state);
        return {
          ...state,
          isToMe: true,
          payload: action.payload
        };
      case TOME_FAILURE:
        console.log("ToMe_failure");
        // localStorage.removeItem("token");
        return {
          ...state,
          isToMe: false,
        };
      default:
        return state;
    }
  };
  
  export default tomeReducer;