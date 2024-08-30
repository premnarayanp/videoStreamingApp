import React from 'react';
import ReactDOM from 'react-dom/client';
//import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';
import { App } from './components';
import './styles/index.css';
import { setUserFromToken } from './redux/action/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


setUserFromToken(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
    <HashRouter basename='/'>
      <Provider store={store}>
        <App />
      </Provider>,
    </HashRouter>
  </ToastProvider>
);

