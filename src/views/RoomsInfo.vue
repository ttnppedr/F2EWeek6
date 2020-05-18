<template lang="pug">
  div(class="rooms-info")
    div(class="carousel") 
      p(
        class="previous"
        @click="goPreviousPage"
      ) 
        previousIcon
        span 查看其他房型
      div(class="booking")
        p 
          span {{ "$1,380" }} 
          | / {{ "1" }}晚
        button(
          type="button"
        ) Booking now
      Carousel(
        @click.native="showPopup = true"
        :singleRoomImgs="singleRoomImgs"
      )
    div(class="room-info") 
      div(class="each-room-details")
        h2 
          span(class="room-type") {{ singleRoomName }}
          span {{ roomSpecification(singleRoomName) }}
        div(class="check-and-price")
          p(class="price") 平日（一～四）價格：{{ roomPrice.normalDayPrice }} / 假日（五〜日）價格：{{ roomPrice.holidayPrice }}
          p(class="check-in") 入住時間：{{ roomCheckInandOut.checkInEarly }}（最早）/ {{ roomCheckInandOut.checkInLate }}（最晚）
          p(class="check-out") 退房時間：{{ roomCheckInandOut.checkOut }}
        ul(class="room-use-guide")
          li(
            v-for="(description, index) in roomUseGuide" 
            :key="index"
          ) {{ description }} 
        RoomAmenities
      div(class="calendar")
    Popup(
      :showPopup="showPopup"
      :imgIndex="imgIndex"
      :roomImgsLen="singleRoomImgs.length"
      :singleRoomImgs="singleRoomImgs"
      @propClickShowPopup="showPopup = false"
      @propResetImgIndex="imgIndex = 0"
      @propChangePrevImgIndex="changePrevImgIndex"
      @propChangeNextImgIndex="changeNextImgIndex"
    )
</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";

// components
import Carousel from '@/components/utils/Carousel.vue'
import Popup from '@/components/utils/Popup.vue'
import RoomAmenities from '@/components/RoomAmenities.vue'
// assets
import previousIcon from '@/assets/img/rooms/surface1.svg'


export default {
  name: 'RoomesInfo',
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      showPopup: false,
      imgIndex: 0,
    }
  },
  methods: {
    ...mapActions({
      getSingleRoom: 'getSingleRoom'
    }),
    goPreviousPage() {
      this.$router.push({ name: 'HomePage' });
    },
    changePrevImgIndex() {
      this.imgIndex = this.imgIndex <= 0
        ? this.imgIndex
        : this.imgIndex - 1
    },
    changeNextImgIndex() {
      const singleRoomImgsLen = this.singleRoomImgs.length; 
      this.imgIndex = this.imgIndex < singleRoomImgsLen - 1
        ? this.imgIndex + 1
        : this.imgIndex
    },
  },
  computed: {
    ...mapGetters({
      singleRoomImgs: "singleRoomImgs",
      singleRoomName: "singleRoomName",
      roomSpecification: "roomSpecification",
      roomPrice: "roomPrice",
      roomCheckInandOut: "roomCheckInandOut",
      roomUseGuide: "roomUseGuide",
    })
  },
  components: {
    previousIcon,
    Carousel,
    Popup,
    RoomAmenities,
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      await this.getSingleRoom(id);
    } catch (error) {
      console.log("error", error);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/fonts.scss';

.rooms-info {
  display: flex;
  .carousel {
    flex: 0 1 35%;
    position: relative;
    height: 100vh;
    cursor: pointer;
    .previous {
      position: absolute;
      z-index: 3;
      top: 10%;
      left: 10%;
      font-size: 14px;
      color: #38470B;
      cursor: pointer;
      &::before {
        content: '';
        width: 0;
        position: absolute;
        bottom: -5px;
        left: 10px;
        height: 1px;
        background: #38470B;
        transition: width 0.3s;
      }
      &:hover::before {
        width: 90%;
      }
      > svg, span  {
        vertical-align: middle;
      }
      span {
        margin-left: 5px;
      }
    }
    .booking {
      position: absolute;
      z-index: 3;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -60%);
      > p {
        color: #38470B;
        font-size: 20px;
        text-align: center;
        > span {
          font-size: 36px;
        }
      }
      > button {
        width: 252px;
        background: #38470B;
        color: #ffffff;
        padding: 10px 50px;
        margin-top: 5px;
        outline: none;
        border: none;
        transition: opacity .2s;
        cursor: pointer;
        font-family: 'Open Sans', sans-serif;
        font-size: 20px;
        &:hover {
          opacity: .8;
        }
      }
    }
  }
  .room-info {
    flex: 0 1 65%;
    height: 100vh;
    padding: 85px 100px 30px 57px;
    overflow-y: scroll;
    .each-room-details {
      h2 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
        > span:nth-child(2) {
          font-size: 14px;
          align-self: flex-end;
          padding-bottom: 10px;
        }
        > .room-type {
          font-size: 40px;
        }
      }
      .check-and-price {
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 40px;
      }
      .room-use-guide {
        font-size: 14px;
        margin-bottom: 40px;
        li {
          margin-left: 20px;
        }
      }
    }
  }
  .calendar {
    height: 100px;
    outline: 1px solid #f00;
  }
}
</style>