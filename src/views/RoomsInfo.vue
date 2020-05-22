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
        router-link(
          :to="{ name: 'success' }"
        ) 成功預約
        p 
          span ${{ totalPrice }} 
          | / {{ getPeriodOfDays }}晚
        button(
          type="button"
          @click="bookingPopup = true;"
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
        RoomAmenities(
          :roomAmentities="roomAmentities"
        )
      div(class="calendar")
        p 空房狀態查詢
        DatePicker(
          is-inline
          mode="range"
          v-model="range"
          locale="en-US"
          :masks="{ weekdays: 'WW' }"
          :columns="$screens({ default: 1, lg: 2 })"
          :available-dates='{ start: new Date(), end: null }'
          @click.native="getDateItem($event)"
        )
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
    BookingPopup(
      :roomAmentities="roomAmentities"
      :calculatePrice="calculatePrice()"
      :getSelectedDays="getSelectedDays()"
      :getPeriodOfDays="getPeriodOfDays"
      :checkIn="range.start"
      :checkOut="range.end"
      :bookingPopup="bookingPopup"
      @propBookingPopup="bookingPopup = false"
      @updateCheckoutHandler="updateCheckoutHandler"
      @updateCheckInHandler="updateCheckInHandler"
      @propBookingRoomHandler="propBookingRoomHandler"
    )
</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";

import { 
  calculateDays,
  periodOfDays 
} from '@/assets/utils/dateConvertor.js';
import {
  formatCurrency
} from '@/assets/utils/currencyConvertor.js';
// components
import Carousel from '@/components/pages/RoomsInfo/Carousel.vue'
import Popup from '@/components/pages/RoomsInfo/Popup.vue'
import RoomAmenities from '@/components/pages/RoomsInfo/RoomAmenities.vue'
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import BookingPopup from '@/components/pages/RoomsInfo/BookingPopup'

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
      range: {
        start: calculateDays(new Date(), 0),
        end: calculateDays(new Date(), 1)
      },
      dateItem: [],
      bookingPopup: false,
    }
  },
  methods: {
    ...mapActions({
      getSingleRoom: 'getSingleRoom',
      bookingRoom: 'bookingRoom'
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
    calculatePrice() {
      const normalDay = ['一', '二', '三', '四'], holidayDay = ['五', '六', '日'];
      const normalDayCost = this.roomPrice.normalDayPrice;
      const holidayDayCost = this.roomPrice.holidayPrice;
      const normalDayPrice = this.calculateRoomPrice(normalDay, normalDayCost);
      const holidayDayPrice = this.calculateRoomPrice(holidayDay, holidayDayCost);

      return !(holidayDayPrice + normalDayPrice)
        ? 0
        : holidayDayPrice + normalDayPrice 
    },
    calculateRoomPrice(dayType, cost) {
      const selectedDays = this.getSelectedDays();
      return selectedDays.reduce((total, day) => {
        let isSelectedNormal = dayType.some(selected => selected == day);
        if (!isSelectedNormal) return total;

        total += cost;
        return total;
      }, 0);
    },
    getSelectedDays() {
      const daysNumber = [];
      const week = ['日', '一', '二', '三', '四', '五', '六'];
      const period = periodOfDays(this.range.start, this.range.end);

      for (let i = 0; i < period; i++) {
        let periodTimestamps = calculateDays(this.range.start, i);
        daysNumber.push(new Date(periodTimestamps).getDay());
      }

      return daysNumber.map(num => week[num]);
    },
    getDateItem(event) {
      this.dateItem.push(event.target);
      this.addBackgroundColorToDateItems();
    },
    addBackgroundColorToDateItems() {
      if (this.dateItem.length > 2) {
        this.dateItem[0].style.background = "transparent";
        this.dateItem[1].style.background = "transparent";
        this.dateItem.splice(0, 2);
      }
      if (this.dateItem.length < 2) return;

      this.dateItem = this.dateItem
        .sort((a, b) => Number(a.textContent) - Number(b.textContent));

      this.dateItem[0].style.background = "#38470B";
      this.dateItem[1].style.background = "#949C7C";
    },
    getInitDateItem() {
      const span = document.querySelectorAll('.vc-day-content');
      const first = new Date(this.range.start).getDate();
      const second = new Date(this.range.end).getDate();
      const startElement = [...span].find(el => el.textContent == first);
      const endElement = [...span].find(el => el.textContent == second);

      this.dateItem = [startElement, endElement];
      this.addBackgroundColorToDateItems();
    },
    updateCheckInHandler(date) {
      this.range.start = date;
    },
    updateCheckoutHandler(date) {
      this.range.end = date;
    },
    async propBookingRoomHandler(postObj) {
      const res = await this.bookingRoom(postObj);
      const { status } = res;
      if (status == 200 || status == 400) {
        this.showReservationPopup = true;
        this.bookingPopup = false;
      }
    }
  },
  computed: {
    ...mapGetters({
      singleRoomImgs: "singleRoomImgs",
      singleRoomName: "singleRoomName",
      roomSpecification: "roomSpecification",
      roomPrice: "roomPrice",
      roomCheckInandOut: "roomCheckInandOut",
      roomUseGuide: "roomUseGuide",
      roomAmentities: "roomAmentities",
      bookingRoomSuccess: "bookingRoomSuccess",
      bookingRoomFail: "bookingRoomFail"
    }),
    getPeriodOfDays() {
      return periodOfDays(this.range.start, this.range.end);
    },
    totalPrice() {
      const getTotalPrice = this.calculatePrice();
      return formatCurrency(getTotalPrice);
    }
  },
  components: {
    previousIcon,
    Carousel,
    Popup,
    RoomAmenities,
    DatePicker,
    BookingPopup,
    ReservationPopup
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      await this.getSingleRoom(id);
    } catch (error) {
      console.log("error", error);
    }
    this.getInitDateItem();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/fonts.scss';
@import '@/assets/scss/vendors/v-calendar/v-calendar.scss';
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
    p {
      margin-bottom: 8px;
    }
  }
}
</style>