import React, { useState, useEffect, useCallback } from 'react';
// import Peer from 'simple-peer';
import { useSelector } from 'react-redux';

const RoomsPage = () => {
  // const [remoteSocketId, setRemoteSocketId] = useState(null);
  // const [myStream, setMyStream] = useState();


  // const dispatch = useDispatch();
  //const rooms = useSelector((state) => state.roomReducer);
  const socket = useSelector((state) => state.socketReducer.streamSocket);


  const handleUserJoin = useCallback((data) => {
    console.log("user joined From Backend", data);
    //const { room, email } = data;

  }, []);

  // const handleCallUser = useCallback((data) => {
  //   const stream = navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: true
  //   });

  //   setMyStream(stream);
  // }, []);



  useEffect(() => {
    if (socket) {
      socket.on('user:joined', handleUserJoin);
      return () => {
        socket.off('user:joined', handleUserJoin);
      }
    }

  }, [socket, handleUserJoin]);

  return (
    <div>Room Page</div>
  )

}
export default RoomsPage;