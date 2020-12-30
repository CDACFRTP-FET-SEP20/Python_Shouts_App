import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import FriendListReducer from "../components/Friends/FriendList/FriendListReducer";
import ReceiverReducer from "../components/Friends/Received/ReceiverReducer";
import SenderReducer from "../components/Friends/Sent/SenderReducer";
import BlockFriendReducer from "../components/Friends/BlockFriend/BlockFriendReducer";
import SearchReducer from "../components/Friends/Dashboard/SearchReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  requestReceived: ReceiverReducer,
  requestSent: SenderReducer,
  friendList: FriendListReducer,
  blockFriendList: BlockFriendReducer,
  search: SearchReducer,
});

export default rootReducer;
