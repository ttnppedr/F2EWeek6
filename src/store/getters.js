export default {
  formatAllRooms: ({ rooms }) => {
    return rooms.map(room => {
      return {
        id: room.id,
        img: room.imageUrl
      }
    })
  },
  singleRoomImgs: ({ singleRoom }) => {
    const initObj = [
      { imageUrl: [] }
    ];
    return singleRoom.room
      ? singleRoom.room[0].imageUrl
      : singleRoom.room = initObj; 
  }
}