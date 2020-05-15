
import api from '../assets/axiosHandler'

export default {
  async getAllRooms({ commit }) {
    const res = await api.get('/rooms');
    const { items } = res.data;
    commit('updateAllRooms', items);
  }
}