<template lang="pug">
  div(
    class="arrow"
    :class="[setArrowposition, nonClickArrowStyle]"
  )
    svg(xmlns="http://www.w3.org/2000/svg" width="8.316" height="15.874" viewBox="0 0 8.316 15.874" :style="arrowStyleObj")
      defs
      g(transform="translate(-14 -3.991)")
        path(class="a" d="M21.925,3.992a.367.367,0,0,0-.26.114L14.111,11.66a.378.378,0,0,0,0,.534l7.555,7.555a.378.378,0,1,0,.534-.534l-7.288-7.288L22.2,4.64a.377.377,0,0,0,.084-.418A.373.373,0,0,0,21.925,3.992Z" transform="translate(0 0)")

</template>

<script>
// plugin

// components

// views

// assets

export default {
  props: {
    arrowWidth: {
      type: Number,
      required:true
    },
    arrowHeight: {
      type: Number,
      required: true
    },
    isReverse: {
      type: Boolean,
      required: true
    },
    showPopup: {
      type: Boolean,
      required: true
    },
    imgIndex: {
      type: Number,
      required: true
    },
    roomImgsLen: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    setArrowposition() {
      return { 
        "arrow-left": 
          this.showPopup && 
          this.isReverse == false,

        "arrow-right": 
        this.showPopup && 
        this.isReverse == true, 
      }
    },
    nonClickArrowStyle() {
      return {
        "arrow-left-non-active": 
          this.isReverse == false && 
          this.imgIndex == 0,
        "arrow-right-non-active": 
          this.isReverse == true && 
          this.imgIndex == this.roomImgsLen - 1,
      }
    },
    arrowStyleObj() {
      let rotateStyle = this.isReverse
        ? "rotate(180deg)"
        : "rotate(0deg)"
        
      return {
        width: this.arrowWidth + "px",
        height: this.arrowHeight + "px",
        transform: rotateStyle,
        fill: "#fff"
      }
    }
  },
  components: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.arrow {
  display: inline-block;
  > svg {
    vertical-align: middle;
  }
}
.arrow-left {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 100px;
  transform: translate(0, -50%);
}
.arrow-right {
  position: absolute;
  z-index: 999;
  top: 50%;
  right: 100px;
  transform: translate(0, -50%);
}
.arrow-left-non-active, .arrow-right-non-active {
  svg {
    opacity: 0.2;
  }
}
</style>