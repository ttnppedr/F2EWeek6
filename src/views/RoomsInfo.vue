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
      Carousel(
        @click.native="showPopup = true"
        :singleRoomImgs="singleRoomImgs"
      )
    div(class="room-info") 
    transition(name="fade")
      div(
        class="popup"
        v-if="showPopup"
        @click="showPopup = false, imgIndex = 0"
      )
        Arrow(
          :arrowWidth="30"
          :arrowHeight="57"
          :isReverse="false" 
          :showPopup="showPopup"
          :imgIndex="imgIndex"
          :roomImgsLen = "singleRoomImgs.length"
          @click.native.stop="changePrevImgIndex"
        )
        div(class="room-details-imgs")
          img(:src="singleRoomImgs[imgIndex]")
        Arrow(
          :arrowWidth="30"
          :arrowHeight="57"
          :isReverse="true" 
          :showPopup="showPopup"
          :imgIndex="imgIndex"
          :roomImgsLen = "singleRoomImgs.length" 
          @click.native.stop="changeNextImgIndex"
        )
</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";

// components
import Carousel from '@/components/Carousel.vue'
import Arrow from '@/components/base/Arrow.vue'
// views


// assets
import previous from '@/assets/img/rooms/surface1.svg'

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
      previousIcon: previous,
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
      singleRoomImgs: "singleRoomImgs"
    })
  },
  components: {
    Carousel,
    Arrow
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
@import '@/assets/scss/vueNative/vueTransition.scss';

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
  .popup {
    cursor: pointer;
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    .room-details-imgs {
      width: 80%;
      height: 90vh;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      img {
        max-width: calc(100% - 60px);
        height: 100%;
      }
    }
  }
}
</style>