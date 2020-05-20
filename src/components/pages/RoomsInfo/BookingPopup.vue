<template lang="pug">
  div(class="booking")
    div(class="cross")
    div.cross(
      @click
    )
    div(class="booking-container")
      div(
        class="booking-img"
        :class="checkBooking"
      )
        BookingBorder(class="booking-border")
      //- h3 預約失敗
      h3 預約成功
      //- p 哎呀！晚了一步！您預約的日期已經被預約走了， 再看看其它房型吧
      p 請留意簡訊發送訂房通知，入住當日務必出示此訂房通知， 若未收到簡訊請來電確認，謝謝您
</template>

<script>
// assets
import BookingBorder from '@/assets/img/rooms/booking-border.svg';

export default {
  props: {

  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    checkBooking() {
      return 'fail';
    }
  },
  components: {
    BookingBorder,
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.booking {
  background: #38470B;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cross {
  position: absolute;
  top: 60px;
  right: 60px;
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    width: 30px;
    height: 2px;
    background: #ffffff;
    border-radius: 10px;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
.booking-container {
  width: 50%;
  min-width: 50%;
  color: #fff;
  text-align: center;
  .booking-img {
    display: inline-block;
    position: relative;
  }
  .fail {
    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 3;
      width: 60px;
      height: 4px;
      background: #ffffff;
      border-radius: 10px;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
  .success {
    &::before, &::after {
      content: '';
      position: absolute;
      z-index: 3;
      height: 5px;
      background: #ffffff;
      border-radius: 10px;
    }
    &::before {
      top: 60%;
      left: 37%;
      width: 30px;
      transform: translate(-50%, -50%) rotate(55deg);
    }
    &::after {
      top: 55%;
      left: 60%;
      width: 60px;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  h3 {
    font-size: 50px;
    margin-top: 40px;
  }
  p {
    font-size: 20px;
    margin-top: 40px;
  }
}
</style>