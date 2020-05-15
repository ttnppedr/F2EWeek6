export default {
  updateAllRooms(state, payload) {
    state.rooms = payload;
  },
  updateSingleRooms(state, { data }) {
    state.singleRoom = data;
  } 
}