import { combineReducers } from "redux";
import LikeReducer from "./LikeReducer";
import CommentReducer from "./CommentReducer";

const rootReducer = combineReducers({
  like: LikeReducer,
  Comment: CommentReducer,
});

export default rootReducer;