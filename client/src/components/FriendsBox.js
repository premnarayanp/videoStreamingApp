import { useSelector } from 'react-redux';
import '../styles/friendBox.css'
import { Friend } from "./index";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const FriendBox = (props) => {
  const incomingCallRef = useRef([]);
  const outgoingCallRef = useRef([]);
  const navigate = useNavigate();

  const friends = useSelector((state) => state.friendReducer);
  const friendsList = friends.friendsList;
  const socket = useSelector((state) => state.socketReducer.streamSocket);

  const handleIncomingCall = useCallback((data) => {
    console.log("Data From Backend", data);
    //console.log(" incomingCallRef.current[data.email]", incomingCallRef.current[data.to.email]);
    incomingCallRef.current[data.from.email].style.display = "block"
    outgoingCallRef.current[data.from.email].style.display = "none";
  }, []);

  const handleAcceptCall = useCallback((data) => {
    console.log("Data From Backend", data);
    outgoingCallRef.current[data.from.email].innerText = "Call";
    outgoingCallRef.current[data.from.email].disabled = false;
    navigate("/room");
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('call:join', handleIncomingCall);
      return () => {
        socket.off('call:join', handleIncomingCall);
      }
    }

  }, [socket, handleIncomingCall]);

  useEffect(() => {
    if (socket) {
      socket.on('call:accepted', handleAcceptCall);
      return () => {
        socket.off('call:accepted', handleAcceptCall);
      }
    }

  }, [socket, handleAcceptCall]);

  return (
    <div className="Home">
      {friendsList.map((friend, index) => (
        <Friend
          friend={friend}
          key={`friend-${index}`}
          refIndexKey={friend.email}
          incomingCallRef={incomingCallRef}
          outgoingCallRef={outgoingCallRef}
        />
      ))}
    </div>
  )
}

export default FriendBox;