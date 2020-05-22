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
          @mouseover.native="imgIndex = index"
          @click.native="selectRoom(room.id)"
        )
    loading(
      :active.sync="isLoading" 
      :is-full-page="true"
      loader="dots"
      background-color="#38470B"
      color="#fff"
      :width="100"
      :height="100"
    )
</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// components
import RoomsType from "@/components/pages/HomePage/RoomsType.vue";

// assets
import homepage1 from "@/assets/img/homepages/homepage1.jpeg";
import homepage2 from "@/assets/img/homepages/homepage2.jpeg";
import homepage3 from "@/assets/img/homepages/homepage3.jpeg";
import homepage4 from "@/assets/img/homepages/homepage4.jpeg";
import logo from "@/assets/img/logo.png";

export default {
  props: {},
  data() {
    return {
      isChanges: [true, false, false, false],
      bgUrl: [homepage1, homepage2, homepage3, homepage4], 
      backgroundObj: {
        backgroundImage: `url(${homepage1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      imgIndex: 0,
      isLoading: false
    };
  },
  methods: {
    ...mapActions({
      getAllRooms: "getAllRooms",
      getSingleRoom: "getSingleRoom"
    }),
    changeBgImg(index) {
      this.isChanges.fill(false);
      this.isChanges[index] = true;
      this.backgroundObj.backgroundImage = `url(${this.bgUrl[index]})`;
      return this.backgroundObj;
    },
    async selectRoom(id) {
      try {
        this.isLoading = true;
        const { status } = await this.getSingleRoom(id);
        
        if(status != 200) return;
        this.isLoading = false;
        this.$router.push({ 
          name: 'RoomsInfo',
          params: { id }
        });
      } catch (error) {
        console.log("error", error)
      }
    },
  },
  computed: {
    ...mapGetters({
      formatAllRooms: "formatAllRooms"
    }),
    logo() {
      return logo;
    },
  },
  components: {
    RoomsType,
    Loading
  },
  async mounted() {
    try {
      await this.getAllRooms();
    } catch (error) {
      console.log("error", error);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils/fonts.scss";

.home-page-container {
  position: relative;
  display: flex;
  padding: 40px 100px;
  justify-content: center;
  &::before {
    content: "";
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
    flex: 0 1 11%;
    margin-top: 100px;
    .logo {
      margin-bottom: 240px;
      img {
        width: 100%;
      }
    }
    .hotel-info {
      margin-bottom: 80px;
      > h2, p {
        font-size: 12px;
        color: #fff;
      }
      h2 {
        margin-bottom: 16px;
        font-family: "Noto Sans TC", sans-serif;
        font-weight: bold;
      }
      p {
        margin-bottom: 6px;
        font-family: "Noto Sans TC", sans-serif;
        font-weight: 300;
      }
    }
    .dots {
      text-align: right;
      > p {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 1px solid #fff;
        border-radius: 50%;
        margin-right: 11px;
        transition: all 0.4s;
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
    flex: 0 1 900px;
    align-self: center;
    margin-left: 10%;
    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
