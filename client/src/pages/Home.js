import { useEffect } from 'react';
import '../styles/home.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFriends, getFriendStatus } from '../api/index';
import { addFriendList } from '../redux/action/friendsActions';
import { Friend } from "../components/index";


export default function Home(props) {

  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendReducer);
  const auth = useSelector((state) => state.authReducer);

  const friendsList = friends.friendsList;
  const user = auth.user;
  useEffect(() => {
    async function fetchData() {
      const response = await getAllFriends(user._id);
      if (response.success) {
        dispatch(addFriendList(response.data.allFriends));
      }
    }
    fetchData();

  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getFriendStatus();
  //     if (response.success) {
  //       dispatch(addFriendList(response.data.allFriends));
  //     }
  //   }
  //   fetchData();

  // }, []);

  return (
    <div className="Home">
      {friendsList.map((friend, index) => (
        <Friend
          friend={friend}
          key={`friend-${index}`}
        />
      ))}
    </div>
  )
}

