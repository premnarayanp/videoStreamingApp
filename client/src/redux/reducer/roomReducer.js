import { ADD_ROOM_LIST, ADD_ROOM_TO_LIST } from "../action/actionType"


const initialRoomState = {
    roomList: [],
    currentRoom: null
}

export default function rooms(state = initialRoomState, action) {

    switch (action.type) {
        case ADD_ROOM_LIST:
            return {
                ...state,
                roomList: action.data
            }


        case ADD_ROOM_TO_LIST:
            return {
                ...state,
                roomList: [...state.roomList, action.data]
            }


        default:
            return state;
    }

}