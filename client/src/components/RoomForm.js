import '../styles/friendBox.css'
import { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import "../styles/roomBox.css";
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, getMyRooms } from '../api/index';
import { addRoomToList } from "../redux/action/roomActions"


const RoomForm = (props) => {
    const [email, setEmail] = useState('');
    const [roomId, setRoomId] = useState('');
    const [participants, setParticipants] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isAllowDirectJoin, setIsAllowDirectJoin] = useState(true);
    const dispatch = useDispatch();

    const socket = useSelector((state) => state.socketReducer.streamSocket);
    const auth = useSelector((state) => state.authReducer);

    const navigate = useNavigate();


    const handleJoinRoom = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", { room: { roomId: roomId }, email });
        // socket.emit("room:join", { roomId , email });
    }, [email, roomId, socket]);


    const handleCreateRoom = async (e) => {
        e.preventDefault();
        const user = auth.user._id;
        const response = await createRoom(roomId, email, user, participants, isPrivate, isAllowDirectJoin);
        if (response.success && response.data.myRoom) {
            dispatch(addRoomToList(response.data.myRoom));
        }
    }

    return (
        <form className="RoomForm">
            <span className={styles.loginSignupHeader}>Room/Group</span>

            <div className={styles.field}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <input
                    type="text"
                    placeholder="Room Id"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
            </div>

            <div className="field">
                <button onClick={handleJoinRoom}>Join Room</button>
                <button onClick={handleCreateRoom}>Create Room</button>
            </div>
        </form>
    )
}

export default RoomForm;