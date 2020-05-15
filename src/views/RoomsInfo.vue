<template lang="pug">
  div(
    class="rooms-info"
  ) 
    div(
      class="carousel"
    )
    div(
      class="room-info"
    )
</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";

// components


// views


// assets


export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions({

    })
  },
  computed: {
    ...mapGetters({

    })
  },
  components: {

  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/fonts.scss';

.roooms-info {
  .carousel {
    outline: 2px solid#f00;
    height: 100vh;
  }
  .room-info {
    outline: 2px solid#f00; 
    height: 100vh;
  }
}
</style>