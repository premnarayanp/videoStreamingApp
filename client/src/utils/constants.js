export const API_ROOT = 'http://localhost:8363';

export const API_URLS = {
  //API URL for User
  login: () => `${API_ROOT}/api/users/login`,
  signup: () => `${API_ROOT}/api/users/signup`,
  allFriends: (id) => `${API_ROOT}/api/users/friends/${id}`,
  getFriendStatus: (userId) => `${API_ROOT}/api/users/status/${userId}`,
};

export const LOCAL_STORAGE_TOKEN_KEY = '_VIDEO_STREAMING_APP_TOKEN_KEY_';
