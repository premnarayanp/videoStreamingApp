import { ADD_ROOM_LIST, ADD_ROOM_TO_LIST } from './actionType';

//action creator for Letter
export function addRoomList(data) {
    return {
        type: ADD_ROOM_LIST,
        data: data
    }
}

export function addRoomToList(data) {
    return {
        type: ADD_ROOM_TO_LIST,
        data: data
    }
}

