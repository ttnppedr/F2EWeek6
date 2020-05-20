<template lang="pug">
  transition(name="fade")
    div(
      class="popup"
      v-if="showPopup"
      @click="emitClickShowPopup(), emitResetImgIndex()"
    )
      ArrowButton(
        :arrowWidth="30"
        :arrowHeight="57"
        :isReverse="false" 
        :showPopup="showPopup"
        :imgIndex="imgIndex"
        :roomImgsLen = "roomImgsLen"
        @click.native.stop="emitChangePrevImgIndex"
      )
      div(class="room-details-imgs")
        img(:src="singleRoomImgs[imgIndex]")
      ArrowButton(
        :arrowWidth="30"
        :arrowHeight="57"
        :isReverse="true" 
        :showPopup="showPopup"
        :imgIndex="imgIndex"
        :roomImgsLen = "roomImgsLen" 
        @click.native.stop="emitChangeNextImgIndex"
      )
</template>

<script>

// components
import ArrowButton from '@/components/base/ArrowButton.vue'

export default {
  props: {
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
    },
    singleRoomImgs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    emitChangePrevImgIndex() {
      this.$emit('propChangePrevImgIndex');
    },
    emitChangeNextImgIndex() {
      this.$emit('propChangeNextImgIndex');
    },
    emitClickShowPopup() {
      this.$emit('propClickShowPopup');
    },
    emitResetImgIndex() {
      this.$emit('propResetImgIndex'); 
    }
  },
  computed: {},
  components: {
    ArrowButton
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vueNative/vueTransition.scss';

  .popup {
    cursor: pointer;
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    .room-details-imgs {
      width: 80%;
      height: 90vh;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      img {
        max-width: calc(100% - 60px);
        height: 100%;
      }
    }
  }
</style>