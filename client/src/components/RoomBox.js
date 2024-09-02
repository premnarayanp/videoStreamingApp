import '../styles/friendBox.css'
import { RoomForm, Room } from "./index";
import "../styles/roomBox.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { getMyRooms } from '../api/index';
import { addRoomList } from "../redux/action/roomActions"

const RoomBox = (props) => {
    const rooms = useSelector((state) => state.roomReducer);
    const roomList = rooms.roomList;

    const socket = useSelector((state) => state.socketReducer.streamSocket);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleJoinRoom = useCallback((data) => {
        //console.log("Data From Backend", data);
        const { room, email } = data;
        navigate(`/room/${room.roomId}`);
    }, [navigate]);

    useEffect(() => {
        if (socket) {
            socket.on('room:join', handleJoinRoom);
            return () => {
                socket.off('room:join', handleJoinRoom);
            }
        }

    }, [socket, handleJoinRoom]);


    useEffect(() => {
        async function fetchData() {
            const response = await getMyRooms();
            console.log("==========getMyRooms===============");
            if (response.success) {
                dispatch(addRoomList(response.data.myRooms));
            }
        }
        fetchData();
    }, [dispatch]);

    return (
        <div className='RoomBox'>
            <RoomForm />
            <h5>My Rooms</h5>
            {roomList.map((room, index) => (
                <Room
                    room={room}
                    key={`room-${index}`}
                />
            ))}
        </div>
    )
}

export default RoomBox;