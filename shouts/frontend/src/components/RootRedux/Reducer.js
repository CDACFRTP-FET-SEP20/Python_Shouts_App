import {combineReducers} from 'redux'
import FriendListReducer from '../Friends/FriendList/FriendListReducer'
import ReceiverReducer from '../Friends/Received/ReceiverReducer'
import SenderReducer from '../Friends/Sent/SenderReducer'


const reducer = combineReducers({
    requestReceived:ReceiverReducer,
    requestSent:SenderReducer,
    friendList:FriendListReducer
})

export default reducer