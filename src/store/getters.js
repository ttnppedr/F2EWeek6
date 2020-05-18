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
  },
  singleRoomName: ({ singleRoom }) => {
    const { name } = singleRoom.room[0];
    return name;
  },
  roomSpecification: state => name => {
    const obj = {
      "Deluxe Double Room": "2~3人・ 雙人床・ 附早餐・衛浴1間・26平方公尺",
    };
    return obj[name];
  },
  roomPrice: ({ singleRoom }) => {
    const { holidayPrice, normalDayPrice } = singleRoom.room[0];
    return {
      holidayPrice,
      normalDayPrice
    };
  },
