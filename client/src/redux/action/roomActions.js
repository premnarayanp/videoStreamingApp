import { ADD_FRIENDS_LIST, ADD_CURRENT_FRIEND, ADD_FRIEND_STATUS } from './actionType';

//action creator for Letter
export function addFriendList(data) {
    return {
        type: ADD_FRIENDS_LIST,
        data: data
    }
}

export function addCurrentFriend(data) {
    return {
        type: ADD_CURRENT_FRIEND,
        data: data
    }
}

export function addFriendStatus(data) {
    return {
        type: ADD_FRIEND_STATUS,
        data: data
    }
}

