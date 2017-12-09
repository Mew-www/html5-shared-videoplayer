const API_SERVER = 'https://46.101.175.211/lois/interface/';

export default {
  VIDEO_DIRECTORY_URI: 'http://62.78.180.5/streamprojekti/',
  ROOMS_URI: API_SERVER + 'video/rooms/',
  ROOM_AUTH_URI: API_SERVER + 'video/authenticate',
  SINGLE_ROOM_URI: (room_id) => API_SERVER + 'video/rooms/' + room_id
};