<template lang="pug">
  div(
    class="home-page-container"
    :style="backgroundObj"
  )
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

    })
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.home-page-container {
  position: relative;
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
}
</style>