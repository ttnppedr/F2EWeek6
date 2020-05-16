<template lang="pug">
  div
    el-carousel(
      :interval="30000"
      arrow="never"
      trigger="click"
    )
      el-carousel-item(
        v-for="(imgSrc,i) in singleRoomImgs"
        :key="i"
      )
        div(:style="roomImgObj(imgSrc)")
</template>

<script>

export default {
  props: {
    singleRoomImgs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    roomImgObj(src) {
      return {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }
    }
  },
  computed: {},
  components: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vendors/elementUI/carousel.scss';
</style>