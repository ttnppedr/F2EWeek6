<template lang="pug">
  div(
    class="home-page-container"
    :style="backgroundObj"
  )
    div(class="logo-bar")
      h1(class="logo") 
        img(:src="logoUrl") 
      div
        div(class="hotel-info")
          h2 好室旅店。HOUSE HOTEL
          p 花蓮縣花蓮市國聯一路1號
          p 03-8321155
          p HOUSE@HOTEL.COM
        div(class="dots")
          p
          p
          p
          p
</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";

// components


// views


// assets
import homepage1 from '@/assets/img/homepage1.jpeg'
import homepage2 from '@/assets/img/homepage2.jpeg'
import homepage3 from '@/assets/img/homepage3.jpeg'
import homepage4 from '@/assets/img/homepage4.jpeg'
import logo from '@/assets/img/logo.png'

export default {
  props: {

  },
  data() {
    return {
      bgUrl: [homepage1, homepage2, homepage3, homepage4], 
      backgroundObj: {
        'backgroundImage': `url(${ homepage1 })`,
        'backgroundRepeat': 'no-repeat',
        'backgroundSize': 'cover',
        'backgroundPosition': 'center',
      }
    }
  },
  methods: {
    ...mapActions({

    }),
  },
  computed: {
    ...mapGetters({

    }),
    logoUrl() {
      return logo;
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.home-page-container {
  position: relative;
  display: flex;
  justify-content: center;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
    z-index: 2;
  }
  .logo-bar {
    position: relative;
    z-index: 3;
    flex: 0 1 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .logo {
      margin: 120px 0 185px;
    }
    .hotel-info {
      > h2, p {
        font-size: 12px;
        color: #fff;
      }
      h2 {
        margin-bottom: 16px;
      }
      p {
        margin-bottom: 6px;
      }
    }
    .dots {
      margin: 50px 0 47px;
      text-align: right;
      > p {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 1px solid #fff;
        border-radius: 50%;
        margin-right: 11px;
      }
    }
  }
}
</style>