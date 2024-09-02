import React, { useState, useEffect, useCallback } from 'react';
// import Peer from 'simple-peer';
import { useSelector } from 'react-redux';
import ReactPlayer from "react-player"
import peer from "../services/peer";

const RoomsPage = () => {
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();


  // const dispatch = useDispatch();
  //const rooms = useSelector((state) => state.roomReducer);
  const socket = useSelector((state) => state.socketReducer.streamSocket);


  const handleUserJoin = useCallback((data) => {
    console.log("user joined From Backend", data);
    const { id, email } = data;
    setRemoteSocketId(id);

  }, []);

  const handleCallUser = useCallback(async (data) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    const offer = await peer.getOffer();
    //console.log("offer=====", offer);
    socket.emit("room-user:call", { to: remoteSocketId, offer: offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);


  const handleIncomingCall = useCallback(async (data) => {
    const { from, offer } = data;
    console.log("handleIncomingCall", "---from=", from, "---offer=", offer);
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    setMyStream(stream);
    const ans = await peer.getAnswer(offer);
    console.log("ans=====", ans);
    socket.emit("room-user-call:excepted", { to: from, ans: ans });

  }, [socket]);


  const handleCallExcepted = useCallback(async (data) => {
    const { from, ans } = data;
    console.log("handleCallExcepted", "---from=", from, "---ans=", ans);
    peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('user:joined', handleUserJoin);
      socket.on('room:incoming:call', handleIncomingCall);
      socket.on('room-user-call:excepted', handleCallExcepted);


      return () => {
        socket.off('user:joined', handleUserJoin);
        socket.off('room:incoming:call', handleIncomingCall);
        socket.off('room-user-call:excepted', handleCallExcepted);
      }
    }

  }, [socket, handleUserJoin, handleIncomingCall]);

  return (
    <div className='RoomPage'>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "User Joined" : "Nothing anyone in Room"}</h4>
      {
        remoteSocketId && <button onClick={handleCallUser}>Call</button>
      }

      {
        myStream &&
        <ReactPlayer
          playing
          muted
          height="200px"
          width="200px"
          url={myStream} />
      }

    </div>
  )

}
export default RoomsPage;