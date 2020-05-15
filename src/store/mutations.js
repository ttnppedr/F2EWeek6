export default {
  updateAllRooms(state, payload) {
    state.rooms = payload;
  },
  updateSingleRooms(state, payload) {
    state.singleRoom = payload;
  } 
}