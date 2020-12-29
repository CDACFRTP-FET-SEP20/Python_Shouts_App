import { combineReducers } from "redux";
import LikeReducer from "./LikeReducer";
import CommentReducer from "./CommentReducer";
import ReportReducer from "./ReportReducer"

const rootReducer = combineReducers({
  like: LikeReducer,
  Comment: CommentReducer,
  report: ReportReducer,
});

export default rootReducer;