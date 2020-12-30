// const initialState = {};

// function reducer(state = initialState, action) {
//   if (action.type === "AddComment") {
//     state = action.payload;
//   }

//   return state;
// }

// export default reducer;

import { ADD_COMMENT } from "../actions/action_types";  
const initialState = {  
  comments: []  
};  
const commentReducer = (state = initialState, action) => {  
  switch (action.type) {  
    case ADD_COMMENT:  
      return { ...state,comments:[...state.comments,action.payload]};  
    default:  
      return state;  
  }  
};  
export default commentReducer;