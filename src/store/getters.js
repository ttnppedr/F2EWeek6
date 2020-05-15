export default {
  formatAllRooms: state => {
    return state.rooms.map(room => {
      return {
        id: room.id,
        img: room.imageUrl
      }
    })
  }
}