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
    return singleRoom.room[0].imageUrl
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
  roomCheckInandOut: ({ singleRoom }) => {
    const {
      checkInEarly,
      checkInLate,
      checkOut
    } = singleRoom.room[0].checkInAndOut;

    return {
      checkInEarly,
      checkInLate,
      checkOut
    };
  },
