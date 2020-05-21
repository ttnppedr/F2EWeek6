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
      "Single Room": "1人・ 單人床・ 附早餐・衛浴1間・18平方公尺",
      "Double Room": "2~3人・ 雙人床・ 附早餐・衛浴1間・26平方公尺",
      "Twin Room": "2~4人・ 雙人床・ 附早餐・衛浴1間・36平方公尺",
      "Deluxe Twin Room": "2~4人・ 大型雙人床・ 附早餐・衛浴1間・40平方公尺",
      "Deluxe Single Room": "1人・ 小型雙人床・ 附早餐・衛浴1間・22平方公尺",
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
  roomUseGuide: ({ singleRoom }) => {
    const { description } = singleRoom.room[0];
    const splitDescription = description
      .split('.')
      .filter(str => str);
    return splitDescription;
  },
  roomAmentities: ({ singleRoom }) => {
    const { amenities } = singleRoom.room[0];
    return amenities;
  }
}