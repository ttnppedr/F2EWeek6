<template lang="pug">
  div.booking-process
    h3 
      span 預約流程
      hr
    div
      BookingProcessItems
        template(v-slot:processImg)
          BookingForm
        template(v-slot:prcessDescription)
          | 送出線上預約單
      Arrow(class="arrow-icon")
      BookingProcessItems
        template(v-slot:processImg)
          BookingSearch 
        template(v-slot:prcessDescription)
          | 系統立即回覆是否預訂成功 並以簡訊發送訂房通知 (若未收到簡訊請來電確認)
      Arrow(class="arrow-icon")
      BookingProcessItems
        template(v-slot:processImg)
          BookingCredit
        template(v-slot:prcessDescription)
          | 入住當日憑訂房通知 以現金或刷卡付款即可 (僅接受VISA.JCB.銀聯卡)
</template>

<script>
// components
import BookingProcessItems from '@/components/pages/RoomsInfo/BookingProcess.vue';

// assets
import BookingCredit from '@/assets/img/bookingprocess/credit.svg';
import BookingSearch from '@/assets/img/bookingprocess/search.svg';
import BookingForm from '@/assets/img/bookingprocess/form.svg';
import Arrow from '@/assets/img/rooms/surface1.svg';

export default {
  props: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  components: {
    BookingProcessItems,
    BookingCredit,
    BookingSearch,
    BookingForm,
    Arrow
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
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
</style>