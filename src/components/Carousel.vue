<template lang="pug">
  div
    v-app(id="inspire")
      v-carousel(
        hide-delimiter-background
        show-arrows-on-hover
      )
        v-carousel-item(
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        )
</template>

<script>

export default {
  props: {},
  data() {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
  methods: {},
  computed: {},
  components: {},
  mounted() { }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vendors/vuetify/carousel.scss';
</style>