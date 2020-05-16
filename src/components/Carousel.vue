<template lang="pug">
  div
    v-app(id="inspire")
      v-carousel(
        hide-delimiter-background
        show-arrows-on-hover
        :show-arrows="false"
        :continuous="true"
      )
        v-carousel-item(
          v-for="(imgSrc,i) in singleRoomImgs"
          :key="i"
          :src="imgSrc"
        )
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
  methods: {},
  computed: {},
  components: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vendors/vuetify/carousel.scss';
</style>