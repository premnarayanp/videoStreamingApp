import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import peer from "../services/peer";
import '../styles/roomPage.css';
import { MediaPlayer } from "../components/index";

// import Peer from 'simple-peer';
//import ReactPlayer from "react-player"

const RoomsPage = () => {
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [showLeaveBtn, setShowLeaveBtn] = useState(false);
  const [showCallBtn, setShowCallBtn] = useState(true);
  const [showStreamBtn, setShowStreamBtn] = useState(true);

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

    setShowLeaveBtn(true);
    setShowCallBtn(false);
    setShowStreamBtn(false);

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
    setShowCallBtn(false);

    const ans = await peer.getAnswer(offer);
    console.log("ans=====", ans);
    socket.emit("room-user-call:excepted", { to: from, ans: ans });

  }, [socket]);

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }

    setShowLeaveBtn(true);
    setShowCallBtn(false);
    setShowStreamBtn(false);
  }, [myStream])

  const handleCallExcepted = useCallback(async (data) => {
    const { from, ans } = data;
    console.log("handleCallExcepted", "---from=", from, "---ans=", ans);
    peer.setLocalDescription(ans);

    // for (const track of myStream.getStracks()) {
    //   peer.peer.addTrack(track, myStream);
    // }
    sendStreams();

  }, [sendStreams]);  //myStream

  const handleNegotiationNeeded = useCallback(async (ev) => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegotiationNeededIncoming = useCallback(async (data) => {
    const { from, offer } = data;
    const ans = await peer.getAnswer(offer);
    // console.log("ans=====", ans);
    socket.emit("peer:nego:done", { to: from, ans: ans });

  }, [socket])


  const handleNegotiationNeededFinal = useCallback(async (data) => {
    const { from, ans } = data;
    await peer.setLocalDescription(ans);
  }, [])

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
    }
  }, [handleNegotiationNeeded]);


  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  });

  useEffect(() => {
    if (socket) {
      socket.on('user:joined', handleUserJoin);
      socket.on('room:incoming:call', handleIncomingCall);
      socket.on('room-user-call:excepted', handleCallExcepted);
      socket.on('peer:nego:needed', handleNegotiationNeededIncoming);
      socket.on('peer:nego:final', handleNegotiationNeededFinal);


      return () => {
        socket.off('user:joined', handleUserJoin);
        socket.off('room:incoming:call', handleIncomingCall);
        socket.off('room-user-call:excepted', handleCallExcepted);
        socket.off('peer:nego:needed', handleNegotiationNeededIncoming);
        socket.off('peer:nego:final', handleNegotiationNeededFinal);
      }
    }

  }, [socket, handleUserJoin, handleIncomingCall, handleCallExcepted, handleNegotiationNeededIncoming, handleNegotiationNeededFinal]);

  return (
    <div className='RoomPage'>
      <h1 className='page-heading'>Room Page</h1>
      <h4>{remoteSocketId ? "User Joined" : "Nothing anyone in Room"}</h4>

      {remoteSocketId && showCallBtn && <button className='callBtn' onClick={handleCallUser}>Call</button>}
      {myStream && showStreamBtn && <button className='callBtn' onClick={sendStreams}>Send Stream</button>}
      {showLeaveBtn && <button className='callBtn' >Leave Call</button>}

      <div className='mediaContainer'>
        {myStream && <MediaPlayer stream={myStream} userType="You" height="300px" width="300px" />}
        {remoteStream && <MediaPlayer stream={remoteStream} userType="Remote User" height="300px" width="300px" />}
      </div>
    </div>
  )

}
export default RoomsPage;






// {
//   remoteSocketId && showLeaveBtn ? <button className='leaveBtn'>Leave Call</button> :
//     <button className='callBtn' onClick={handleCallUser}>Call</button>
// }