<template lang="pug">
  div(class="rooms-info")
    div(
      class="carousel"
    ) 
      p(
        class="previous"
      ) 
        img(:src="previousIcon") 
        span 查看其他房型
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
    })
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
  }
  .room-info {
    flex: 0 1 65%;
    height: 100vh;
  }
}
</style>