<template lang="pug">
  div(class="room-img")
    img(:src="roomImg")
</template>

<script>
// plugin
import { mapActions, mapGetters } from "vuex";

// components


// views


// assets


export default {
  props: {
    roomImg: {
      type: String,
      required: true,
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
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.room-img {
  width: 275px;
  height: 275px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>