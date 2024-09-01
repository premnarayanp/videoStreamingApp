import { ADD_STREAM_SOCKET } from "../action/actionType"


const initialSocketState = {
    streamSocket: null,
}

export default function rooms(state = initialSocketState, action) {

    switch (action.type) {

        case ADD_STREAM_SOCKET:
            return {
                ...state,
                streamSocket: action.data
            }


        default:
            return state;
    }

}