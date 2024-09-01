//import { addFriendStatus } from '../redux/action/roomActions';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/friends.css'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Friend = (props) => {
  const socket = useSelector((state) => state.socketReducer.streamSocket);
  const auth = useSelector((state) => state.authReducer);
  const navigate = useNavigate();


  const { friend, incomingCallRef, outgoingCallRef, refIndexKey } = props;


  const handleConversation = async () => {

  }


  // emit call for user 
  const handleOutgoingCall = useCallback((e) => {
    //e.preventDefault();
    socket.emit("call:join", { to: friend, from: auth.user });
    outgoingCallRef.current[refIndexKey].innerText = "Calling.....";
    outgoingCallRef.current[refIndexKey].disabled = true;
  },

    [socket, auth.user, friend, outgoingCallRef, refIndexKey]
  );


  //Except incoming call
  const handleJoinCall = async () => {
    socket.emit("call:accepted", { to: friend, from: auth.user });
    navigate("/room");
  }

  return (
    <div className="Friend" onClick={() => handleConversation()} >
      <div className='rounded-img-container'>
        <img src={require('../assets/mp-icon-3.png')} alt="friend-I" />
      </div>
      <div>
        <span className='friendName'>{friend.name} ~ </span>
        <span className='friendName'>{friend.email}</span>
      </div>

      <div>
        <span className='status'>{"Online"} ~ </span>
        <button ref={el => outgoingCallRef.current[refIndexKey] = el} className='callBtn outgoingCall' onClick={() => handleOutgoingCall()}> Call</button>
        <button ref={el => incomingCallRef.current[refIndexKey] = el} className='callBtn incomingCall' onClick={() => handleJoinCall()}> Join Call</button>
      </div>
    </div>
  )


}


export default Friend;