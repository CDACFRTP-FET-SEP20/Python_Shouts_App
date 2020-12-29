import ShoutsReducer from "../ShoutsReducer/ShoutsReducer";

import { combineReducers } from "redux";
const reducer = combineReducers({
  shouts: ShoutsReducer,
});
export default reducer;
