import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/login.module.css';
import { login } from '../redux/action/authActions'
import { useSelector, useDispatch } from 'react-redux';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();

  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { isLoginSuccess, user, message } = auth;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return addToast('Please enter both email and password', {
        appearance: 'error',
      });
    }

    //dispatch(login(email, password));
    const response = await login(email, password, dispatch);

    if (response.success && response.data.user) {

      addToast('Successfully logged in', {
        appearance: 'success',
      });

    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setLoggingIn(false);
  };

  console.log("===========isloginsuccess==========", isLoginSuccess)
  if (isLoginSuccess) {
    return (
      <Navigate to="/" replace={true} />
    )
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
