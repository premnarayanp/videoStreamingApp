export const API_ROOT = 'http://localhost:5000';

export const API_URLS = {
  //API URL for User
  login: () => `${API_ROOT}/api/users/login`,
  signup: () => `${API_ROOT}/api/users/signup`,
  allFriends: (id) => `${API_ROOT}/api/users/friends/${id}`,
  getFriendStatus: (userId) => `${API_ROOT}/api/users/status/${userId}`,
  createRoom: () => `${API_ROOT}/api/rooms/create`,
  getMyRooms: () => `${API_ROOT}/api/rooms/my-rooms`,
};

export const LOCAL_STORAGE_TOKEN_KEY = '_VIDEO_STREAMING_APP_TOKEN_KEY_';
