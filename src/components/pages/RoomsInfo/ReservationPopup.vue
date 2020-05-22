<template lang="pug">
  div.booking-wrap
    div(class="booking")
      CrossButton(
        :crossSize="'md'"
        :crossColor="'white'"
        @click.native="emitCloseReservationPopup"
      )
      div(class="booking-container")
        div(
          class="booking-img"
          :class="{ 'success': bookingRoomSuccess && bookingRoomFail == '' }"
        )
          BookingBorder(class="booking-border")
          CrossButton(
            v-if="bookingRoomFail && bookingRoomSuccess == false"
            :crossSize="'large'"
            :crossColor="'white'"
          ) 
        h3(
          v-if="bookingRoomFail && bookingRoomSuccess == false"
        ) 預約失敗
        p(
          v-if="bookingRoomFail && bookingRoomSuccess == false" 
        ) {{ bookingRoomFail }}
        h3(
          v-if="bookingRoomSuccess && bookingRoomFail == ''" 
        ) 預約成功
        p(
          v-if="bookingRoomSuccess && bookingRoomFail == ''"  
        ) 請留意簡訊發送訂房通知，入住當日務必出示此訂房通知， 若未收到簡訊請來電確認，謝謝您
</template>

<script>
// components
import CrossButton from '@/components/base/CrossButton.vue'

// assets
import BookingBorder from '@/assets/img/rooms/booking-border.svg';

export default {
  name: 'ReservatonPopup',
  props: {
    bookingRoomSuccess: {
      type: Boolean,
      required: true
    },
    bookingRoomFail: {
      type: String,
      required: true
    }, 
  },
  data() {
    return {}
  },
  methods: {
    emitCloseReservationPopup() {
      this.$emit('propClickToCloseReservationPopup');
    }
  },
  computed: {},
  components: {
    BookingBorder,
    CrossButton
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.booking-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: "";
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: .75;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
  }
}
.booking {
  position: relative;
  z-index: 4;
  width: 60%;
  padding: 120px 0;
  background: #38470B;


}
.booking-container {
  width: 50%;
  min-width: 50%;
  margin: 0 auto;
  color: #fff;
  text-align: center;
  .booking-img {
    display: inline-block;
    position: relative;
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