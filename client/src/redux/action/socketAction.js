import { ADD_STREAM_SOCKET } from './actionType';
export function addStreamSocket(data) {
    return {
        type: ADD_STREAM_SOCKET,
        data: data
    }
}
