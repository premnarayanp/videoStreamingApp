//import { addFriendStatus } from '../redux/action/roomActions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../styles/friends.css"
const Room = (props) => {
    const socket = useSelector((state) => state.socketReducer.streamSocket);
    const auth = useSelector((state) => state.authReducer);
    const navigate = useNavigate();

    const { room } = props;

    const handleConversation = async () => {

    }

    //Except incoming call
    const handleJoinRoom = async () => {
        socket.emit("room:join", { room: { roomId: room.roomId }, email: room.email });
    }

    return (
        <div className="Friend" onClick={() => handleConversation()} >
            <div className='rounded-img-container'>
                <img src={require('../assets/mp-icon-3.png')} alt="friend-I" />
            </div>
            <div>
                <span className='friendName'>{room.roomId} ~ </span>
                <span className='friendName'>{room.email}</span>
            </div>

            <div>
                <button className='callBtn' onClick={handleJoinRoom}> Join Room</button>
            </div>
        </div>
    )

}


export default Room;