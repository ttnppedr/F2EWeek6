
import api from '../assets/axiosHandler'

export default {
  async getAllRooms({ commit }) {
    const res = await api.get('/rooms');
    const { items } = res.data;
    commit('updateAllRooms', items);
  },
  async getSingleRoom({ commit }, id) {
    const res = await api.get(`/room/${id}`);
    const { data } = res;
    commit('updateSingleRooms', data);
    return res;
  },
  async bookingRoom({ commit }, { postParams, id }) {
    try {
      const res = await api.post(`/room/${id}`, { 
        date: postParams.date,
        name: postParams.name,
        tel: postParams.tel
      });
      const { data } = res;
      commit('updateBookingRoomSucces', data);
    } catch (error) {
      const { data } = error.response;
      commit('updateBookingRoomFail', data);
    }
  }
}