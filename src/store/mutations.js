export default {
  updateAllRooms(state, payload) {
    state.rooms = payload;
  },
  updateSingleRooms(state, payload) {
    state.singleRoom = payload;
  },
  updateBookingRoomSucces(state, { success }) {
    state.bookingStatus.success = success;
    state.bookingStatus.fail = '';
  },
  upadteBookingRoomFail(state, { message }) {
    state.bookingStatus.fail = message;
    state.bookingStatus.success = false;
  },
}