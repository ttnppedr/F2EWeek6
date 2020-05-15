<template lang="pug">
  div(
    class="home-page-container"
    :style="backgroundObj"
  )
    div(class="logo-bar")
      h1(class="logo") 
        img(:src="logo") 
      div
        div(class="hotel-info")
          h2 好室旅店。HOUSE HOTEL
          p 花蓮縣花蓮市國聯一路1號
          p 03-8321155
          p HOUSE@HOTEL.COM
        div(class="dots")
          p(
            v-for="(item, index) in 4" :key="index"
            @click="changeBgImg(index)"
            :class="{ 'change-img': isChanges[index] }"
          )
    div(class="rooms")
      div
        RoomsType(
          v-for="(room, index) in formatAllRooms" :key="index"
          :roomImg="room.img"
          :imgIndex="imgIndex"
          :id="room.id"
          @mouseover.native="imgIndex = index"
        )
</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";

// components
import RoomsType from '@/components/RoomsType.vue'

// views


// assets
import homepage1 from '@/assets/img/homepages/homepage1.jpeg'
import homepage2 from '@/assets/img/homepages/homepage2.jpeg'
import homepage3 from '@/assets/img/homepages/homepage3.jpeg'
import homepage4 from '@/assets/img/homepages/homepage4.jpeg'
import logo from '@/assets/img/logo.png'


export default {
  props: {

  },
  data() {
    return {
      isChanges: [true, false, false, false],
      bgUrl: [homepage1, homepage2, homepage3, homepage4], 
      backgroundObj: {
        'backgroundImage': `url(${ homepage1 })`,
        'backgroundRepeat': 'no-repeat',
        'backgroundSize': 'cover',
        'backgroundPosition': 'center',
      },
      imgIndex: 0,
    }
  },
  methods: {
    ...mapActions({
      getAllRooms: 'getAllRooms',
    }),
    changeBgImg(index) {
      this.isChanges.fill(false);
      this.isChanges[index] = true;
      this.backgroundObj.backgroundImage = `url(${ this.bgUrl[index] })`;
      return this.backgroundObj;
    },
  },
  computed: {
    ...mapGetters({
      formatAllRooms: 'formatAllRooms'
    }),
    logo() {
      return logo;
    }
  },
  components: {
    RoomsType,
  },
  async mounted() {
    try {
      const res = await this.getAllRooms();
    } catch (error) {
      console.log("error", error)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/calculatePercentage.scss';
@import '@/assets/scss/utils/fonts.scss';

.home-page-container {
  position: relative;
  display: flex;
  padding: 
    calSidePercentage('height', 50) 
    calSidePercentage('width', 200);
  justify-content: space-around;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
  }
  .logo-bar {
    position: relative;
    z-index: 3;
    flex: 0 1 10%;
    margin-top: 100px;
    .logo {
      margin-bottom: 150px;
    }
    .hotel-info {
      margin-bottom: 80px;
      > h2, p {
        font-size: 12px;
        color: #fff;
      }
      h2 {
        margin-bottom: 16px;
        font-family: 'Noto Sans TC', sans-serif;
        font-weight: bold;
      }
      p {
        margin-bottom: 6px;
        font-family: 'Noto Sans TC', sans-serif;
        font-weight: 300;
      }
    }
    .dots {
      text-align: right;
      > p {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 1px solid #fff;
        border-radius: 50%;
        margin-right: 11px;
        transition: all .4s;
        cursor: pointer;
      }
      .change-img {
        background: #ffffff;
      }
    }
  }
  .rooms {
    position: relative;
    z-index: 3;
    flex: 0 1 825px;
    align-self: center;
    > div {
      height: 72%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>