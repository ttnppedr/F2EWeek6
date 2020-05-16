<template lang="pug">
  div(class="rooms-info")
    div(class="carousel") 
      p(
        class="previous"
        @click="goPreviousPage"
      ) 
        img(:src="previousIcon") 
        span 查看其他房型
      div(class="booking")
        p 
          span {{ "$1,380" }} 
          | / {{ "1" }}晚
        button(
          type="button"
        ) Booking now
      room-carousel(
        :singleRoomImgs="singleRoomImgs"
      )
    div(
      class="room-info"
    ) 
</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";

// components
import Carousel from '@/components/Carousel.vue'

// views


// assets
import previous from '@/assets/img/rooms/surface1.svg'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      previousIcon: previous
    }
  },
  methods: {
    ...mapActions({
      getSingleRoom: 'getSingleRoom'
    }),
    goPreviousPage() {
      this.$router.push({ name: 'HomePage' });
    }
  },
  computed: {
    ...mapGetters({
      singleRoomImgs: "singleRoomImgs"
    })
  },
  components: {
    "room-carousel": Carousel
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
    .previous {
      position: absolute;
      z-index: 3;
      top: 10%;
      left: 10%;
      font-size: 14px;
      color: #38470B;
      cursor: pointer;
      &:hover::before {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 10px;
        width: 90%;
        height: 1px;
        background: #38470B;
      }
      > img, span  {
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
  }
}
</style>