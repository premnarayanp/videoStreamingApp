import '../styles/home.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FriendBox, RoomBox } from "../components/index";

import { getAllFriends } from '../api/index';
import { addFriendList } from '../redux/action/friendsActions';
import { addStreamSocket } from '../redux/action/socketAction';

import { io } from 'socket.io-client';
import { API_ROOT as host } from '../utils/index';



export default function Home(props) {
  const user = props.user;
  const dispatch = useDispatch();

  useEffect(() => {
    //add user & socket
    async function fetchData() {
      if (user) {
        const streamSocket = io(host);
        streamSocket.emit("add-user", user);
        dispatch(addStreamSocket(streamSocket))
      }
    }
    fetchData();
  });

  useEffect(() => {
    async function fetchData() {
      const response = await getAllFriends(user._id);
      if (response.success) {
        dispatch(addFriendList(response.data.allFriends));
      }
    }
    fetchData();
  },);

  return (
    <div className="Home">
      <FriendBox />
      <RoomBox />
    </div>
  )
}

