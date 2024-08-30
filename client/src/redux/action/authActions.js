import { SUCCESS_SIGN_UP, SUCCESS_LOGIN, SUCCESS_LOGOUT, SET_USER } from './actionType';
import { login as userLogin, signUp } from '../../api/index';
import {
    setItemInLocalStorage,
    LOCAL_STORAGE_TOKEN_KEY,
    removeItemFromLocalStorage,
    getItemFromLocalStorage,
} from '../../utils/index';
import jwt from 'jwt-decode';

//import { useDispatch } from 'react-redux';
//const dispatch = useDispatch();

//action creator Auth
export function successSignUp(val, msg) {
    return {
        type: SUCCESS_SIGN_UP,
        isSignUpSuccess: val,
        message: msg
    }
}


export function successLogin(val, user, msg) {
    return {
        type: SUCCESS_LOGIN,
        isLoginSuccess: val,
        user: user,
        message: msg
    }
}

export function successLogout(val, user) {
    return {
        type: SUCCESS_LOGOUT,
        isLogout: val,
        user: user,
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        user: user,
    }
}

export const register = async (name, email, password, confirmPassword, dispatch) => {
    const response = await signUp(name, email, password, confirmPassword);
    if (response.success) {
        dispatch(successSignUp(true, response.msg))
    } else {
        // dispatch(signUpFail(true,response.msg));
    }
    return response;
}


export const login = async (email, password, dispatch) => {
    const response = await userLogin(email, password);
    if (response.success) {
        setItemInLocalStorage(
            LOCAL_STORAGE_TOKEN_KEY,
            response.data.token ? response.data.token : null
        );

        dispatch(successLogin(true, response.data.user, response.message));
    } else {
        // dispatch(loginFail(true,null,response.message));
    }

    return response;
};


export const logout = () => {
    console.log("====================logout=====================")
    removeItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
    return function (dispatch) {
        dispatch(successLogout(true, null));
    }
};

export const setUserFromToken = (dispatch) => {
    const userToken = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
    if (userToken) {
        const user = jwt(userToken);
        console.log("user_from local", user)
        dispatch(setUser(user));
    }
};
