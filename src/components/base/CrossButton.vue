<template lang="pug">
  div.cross(
    :class="[selectedCrossSize, selectedCrossColor]"
  )
</template>

<script>

export default {
  name: "CrossButton",
  props: {
    crossSize: {
      type: String,
      required: true,
    },
    crossColor: {
      type: String,
      required: true,
    }
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    selectedCrossSize() {
      const obj = {
        'large': 'cross-large',
        'md': 'cross-md',
      }
      return obj[this.crossSize];
    },
    selectedCrossColor() {
      const obj = {
        'white': 'cross-white',
        'dark-green': 'cross-dark-green'
      }
      return obj[this.crossColor]; 
    }
  },
  components: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
  .cross {
    position: absolute;
    top: 60px;
    right: 60px;
    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 3;
      border-radius: 10px;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  .cross-large {
    top: 50%;
    &::before, &::after {
      width: 60px;
      height: 4px;
    }
  }
  .cross-md {
    cursor: pointer;
    &::before, &::after {
      width: 30px;
      height: 2px;
    }
  }
  .cross-white {
    &::before, &::after {
      background: #ffffff;
    } 
  }
  .cross-dark-green {
    &::before, &::after {
      background: #38470B;
    } 
  }
</style>