import '../styles/friends.css'
import { addFriendStatus } from '../redux/action/friendsActions';
import { useSelector, useDispatch } from 'react-redux';

const Friend = (props) => {
  const { friend } = props;
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendReducer);
  const friendStatus = friends.friendStatus;


  const handleConversation = async () => {

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
        <span className='status'>{friendStatus} ~ </span>
        <button className='callBtn'>Call</button>
      </div>
    </div>
  )
}
export default Friend;