export const API_ROOT = 'http://localhost:8363';

export const API_URLS = {
  //API URL for User
  login: () => `${API_ROOT}/api/users/login`,
  signup: () => `${API_ROOT}/api/users/signup`,
  // allUser: (id) => `${API_ROOT}/api/users/all-users/${id}`,
  // getUserIsOnline:(userId)=> `${API_ROOT}/api/users/is-online-user/${userId}`,
};

export const LOCAL_STORAGE_TOKEN_KEY = '_VIDEO_STREAMING_APP_TOKEN_KEY_';
