import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../redux/action/authActions';
import '../styles/navbar.css'
import { useSelector, useDispatch } from 'react-redux';

function Navbar(props) {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const logoutFromDevice = () => {
    dispatch(logout());
  }

  return (
    auth.user ?
      <div className="nav">
        <Link to="/">
          <button className='menuButton'>Home</button>
        </Link>

        <button className='menuButton' onClick={logoutFromDevice}>Log out</button>

        <div className='rounded-img-container'>
          <img src={require('../assets/myPhoto.jpg')} alt="user-pic" />
        </div>
      </div>
      :

      <div className="nav">
        <Link to="/users/signup">
          <button className='menuButton'>SignUp</button>
        </Link>

        <Link to="/users/login">
          <button className='menuButton'>Login</button>
        </Link>
      </div>
  );
}

export default Navbar;
