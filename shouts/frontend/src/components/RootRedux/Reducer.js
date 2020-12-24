import {combineReducers} from 'redux'
import FriendListReducer from '../Friends/FriendList/FriendListReducer'
import ReceiverReducer from '../Friends/Received/ReceiverReducer'
import SenderReducer from '../Friends/Sent/SenderReducer'
import BlockFriendReducer from '../Friends/BlockFriend/BlockFriendReducer'

const reducer = combineReducers({
    requestReceived:ReceiverReducer,
    requestSent:SenderReducer,
    friendList:FriendListReducer,
    blockFriendList: BlockFriendReducer
})

export default reducer