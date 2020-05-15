
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
  }
}