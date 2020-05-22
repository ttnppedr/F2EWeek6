<template lang="pug">
  transition(name="fade")
    div.booking-popup(
      v-if="bookingPopup"
    )
      div.container
        div.booking-form
          form
            label(for="name") 姓名
            input(
              type="text" 
              id="name" 
              placeholder="請輸入姓名"
              v-model="name"
            )
            label(for="telephone") 手機號碼
            input(
              type="text" 
              id="telephone" 
              placeholder="請輸入手機號碼"
              v-model="telephone"
            )
            P.checkIn 入住日期
            DatePicker(
              :value="checkInDate"
              @input="checkInHandler($event)"
              locale="en-US"
              :masks="{ weekdays: 'WW', L: 'YYYY - MM - DD' }"
              :available-dates='{ start: start, end: null }'
            )
            p.checkOut 退房日期
            DatePicker(
              :value="checkOutDate"
              @input="checkOutHandler($event)"
              locale="en-US"
              :masks="{ weekdays: 'WW', L: 'YYYY - MM - DD' }"
              :available-dates='{ start: useCalculateDays(checkInDate), end: null }'
            )
            //- p.days {{ selectedPeriodOfDays }}天，{{ normalDays }}晚平日
            div.price
              p 總計
              //- p ${{ totalPrice }}
            button(
              @click.prevent="emitBookingFormHandler"
            ) 確定送出
            p.note 此預約系統僅預約功能，並不會對您進行收費
        div.booking-room-info
          div.room-description
            h2 
              span Single Room
              hr
            p.room-specification 1人・ 單人床・附早餐・ 衛浴1間・18平方公尺 
            p.price 平日（一～四）價格：1380 / 假日（五〜日）價格：1500
            div.amentities
              BookingAmenities(
                :roomAmentities="roomAmentities"
              )
          div.use-guide
            h3 
              span 訂房資訊
              hr 
            ul
              li 入住時間：最早15：00，最晚21：00；退房時間：10：00，請自行確認行程安排。
              li 平日定義週一至週四；假日定義週五至週日及國定假日。
              li 好室旅店全面禁止吸菸。
              li 若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。
          div.booking-process
            h3 
              span 預約流程
              hr
            div
              BookingProcess
                template(v-slot:processImg)
                  BookingForm
                template(v-slot:prcessDescription)
                  | 送出線上預約單
              Arrow(class="arrow-icon")
              BookingProcess
                template(v-slot:processImg)
                  BookingSearch 
                template(v-slot:prcessDescription)
                  | 系統立即回覆是否預訂成功 並以簡訊發送訂房通知 (若未收到簡訊請來電確認)
              Arrow(class="arrow-icon")
              BookingProcess
                template(v-slot:processImg)
                  BookingCredit
                template(v-slot:prcessDescription)
                  | 入住當日憑訂房通知 以現金或刷卡付款即可 (僅接受VISA.JCB.銀聯卡)
        CrossButton(
          :crossSize="'sm'"
          :crossColor="'dark-green'"
          @click.native="closePupop"
        )

</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";
import { 
  calculateDays,
  calculatePeriodOfDays
} from '@/assets/utils/dateConvertor.js';
import {
  formatCurrency
} from '@/assets/utils/currencyConvertor.js';
// components
import CrossButton from '@/components/base/CrossButton.vue'
import ArrowButton from '@/components/base/ArrowButton.vue'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import BookingAmenities from '@/components/pages/RoomsInfo/BookingAmenities.vue';
import BookingProcess from '@/components/pages/RoomsInfo/BookingProcess.vue';
// views


// assets
import Arrow from '@/assets/img/rooms/surface1.svg';
import BookingForm from '@/assets/img/bookingprocess/form.svg';
import BookingCredit from '@/assets/img/bookingprocess/credit.svg';
import BookingSearch from '@/assets/img/bookingprocess/search.svg';

export default {
  props: {
    bookingPopup: {
      type:Boolean,
      required: true
    },
    roomAmentities: {
      type: Object,
      required: true
    },
    checkOut: {
      type: Date,
      required: true
    },
    checkIn: {
      type: Date,
      required: true
    },
    // calculatePrice: {
    //   type: Number,
    //   required: true
    // },
    // getSelectedDays: {
    //   type: Array,
    //   required: true
    // },
    // getPeriodOfDays: {
    //   type: Number,
    //   required: true
    // }
  },
  data() {
    return {
      name: 'aa',
      telephone: '0952555421',
      start: this.checkIn,
      end: this.checkOut,
      startArr: [],
      endArr: []
    }
  },
  methods: {
    ...mapActions({

    }),
    closePupop() {
      this.$emit('propBookingPopup');
    },
    checkOutHandler(date) {
      this.end = date;
    },
    checkInHandler(date) {
      this.start = date;
    },
    useCalculateDays(date) {
      return calculateDays(date, 1);
    },
    emitBookingFormHandler() {
      const date = calculatePeriodOfDays(this.start, this.end);
      const id = this.$route.params.id;
      const postObj = {
        id,
        postParams: {
          name: this.name,
          tel: this.telephone,
          date,
        }
      };
      this.$emit('propBookingRoomHandler', postObj);
    }
  },
  computed: {
    ...mapGetters({

    }),
    checkOutDate() {
      return this.bookingPopup
        ? this.end
        : this.end = this.checkOut
    },
    checkInDate() {
      this.bookingPopup
        ? this.start
        : this.start = this.checkIn
      if(
        new Date(this.start).getDate() >= 
        new Date(this.end).getDate()
      ) {
        const period = new Date(this.start).getDay() - new Date(this.end).getDay();
        this.end = calculateDays(this.end, Math.abs(period) + 1);
      }
      return this.start;
    },
    totalPrice() {
      return formatCurrency(this.calculatePrice);
    },
    normalDays() {
      const normalDay = ['一', '二', '三', '四'];
      return this.getSelectedDays.reduce((total, day) => {
        let isNormalDay = normalDay.find(normal => normal == day);
        if (!isNormalDay) return total;
        
        total += 1;
        return total;
      }, 0);  
    },
    selectedPeriodOfDays() {
      return this.getPeriodOfDays + 1;
    }
  },
  components: {
    CrossButton,
    DatePicker,
    BookingAmenities,
    BookingProcess,
    BookingForm,
    BookingCredit,
    BookingSearch,
    ArrowButton,
    Arrow
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vueNative/vueTransition.scss';
  .booking-popup {
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    &::before {
      position: absolute;
      z-index: 5;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      content: '';
      opacity: .75;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      backdrop-filter: blur(40px);
      -webkit-backdrop-filter: blur(40px);
    }
    .container {
      width: 70%;
      min-width: 960px;
      position: absolute;
      z-index: 5;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      border: 2px solid #38470B;
    }
  }
  .booking-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35%;
    min-width: 35%;
    background: #38470B;
    color: #ffffff;
    padding: 40px 0 30px 0;
    form {
      width: 80%;
      .checkIn {
        margin-bottom: 8px;
      }
      .checkOut {
        margin-top: 16px;
        margin-bottom: 8px;
      }
      label {
        display: block;
        margin-bottom: 8px;
      }
      input[type="text"] {
        width: 100%;
        height: 40px;
        padding: 5px 10px;
        margin-bottom: 20px;
        &::placeholder {
          font-size: 16px;
          color: #38470B;
        }
      }
      .days {
        position: relative;
        color: #949C7C;
        margin-top: 16px;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -17px;
          width: 100%;
          height: 2px;
          background: #949C7C;
        }
      }
      .price {
        text-align: right;
        p:first-child {
          margin-top: 35px;
          font-size: 14px;
        }
        p:nth-child(2) {
          font-size: 26px;
          margin-bottom: 24px;
        }
      }
      button {
        width: 100%;
        padding: 10px 0 ;
        margin: 0 auto 24px;
        background: #38470B;
        border: 1px solid #949C7C;
        color: #ffffff;
        text-align: center;
        font-size: 18px;
        transition: all .3s;
        cursor: pointer;
        &:hover {
          background: #949C7C;
        }
      }
      .note {
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .booking-room-info {
    width: 65%;
    min-width: 65%;
    background: #ffffff;
    padding: 60px 30px 15px;
    .room-description {
      h2 {
        position: relative;
        height: 33px;
        span {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          padding-right: 10px;
          background: #ffffff;
        }
        hr {
          position: absolute;
          top: 50%;
          right: 0;
          width: 100%;
          height: 2px;
          border: 1px solid #949C7C;
          opacity: 0.2;
        }
      }
      > p {
        font-size: 14px;
      }
      .amentities {
        margin-top: 30px;
      }
    }
    .use-guide {
      h3 {
        font-size: 16px;
        position: relative;
        height: 33px;
        span {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          padding-right: 10px;
          background: #ffffff;
        }
        hr {
          position: absolute;
          top: 35%;
          right: 0;
          width: 100%;
          height: 2px;
          border: 1px solid #949C7C;
          opacity: 0.2;
        }
      }
      ul {
        margin-left: 20px;
        li {
          margin-bottom: 12px;
          font-size: 12px;
        }
      }
    }
    .booking-process {
      h3 {
        font-size: 16px;
        position: relative;
        height: 33px;
        span {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          padding-right: 10px;
          background: #ffffff;
        }
        hr {
          position: absolute;
          top: 35%;
          right: 0;
          width: 100%;
          height: 2px;
          border: 1px solid #949C7C;
          opacity: 0.2;
        }
      }
      > div {
        display: flex;
        .arrow-icon {
          transform: rotate(180deg);
          width: 14px;
          height: 21px;
          margin: 10px;
        }
      }
    }
  }
</style>