import { ADD_FRIENDS_LIST, ADD_CURRENT_FRIEND, ADD_FRIEND_STATUS } from "../action/actionType"


const initialRoomState = {
    friendsList: [],
    currentFriend: {},
    friendStatus: "Offline"
}

export default function rooms(state = initialRoomState, action) {

    switch (action.type) {
        case ADD_FRIENDS_LIST:
            return {
                ...state,
                friendsList: action.data
            }


        case ADD_CURRENT_FRIEND:
            return {
                ...state,
                currentFriend: action.data
            }

        case ADD_FRIEND_STATUS:
            return {
                ...state,
                friendStatus: action.data,
            }



        default:
            return state;
    }

}