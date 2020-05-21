<template lang="pug">
  div(
    class="room" 
    :class="selectRoom"
  )
    img(:src="roomImg")
</template>

<script>

export default {
  props: {
    roomImg: {
      type: String,
      required: true,
    },
    imgIndex: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {

    }
  },
  methods: {},
  computed: {
    selectRoom() {
      const obj = {
        0: 'room-1', 1: 'room-2',
        2: 'room-3', 3: 'room-4',
        4: 'room-5', 5: 'room-6',
      }
      return obj[this.imgIndex];
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.room {
  width: 300px;
  height: 300px;
  position: relative;
  text-align: center;
  font-size: 20px;
  line-height: 300px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  &::before {
    transition: opacity .4s;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #38470B;
    opacity: 0;
    color: #38470B;
  }
  &:hover::before {
    color: #fff;
    opacity: 0.6;
  }
}
.room-1::before {
  content: 'Single Room';
}
.room-2::before {
  content: 'Deluxe Single Room';
}
.room-3::before {
  content: 'Double Room';
}
.room-4::before {
  content: 'Deluxe Double Room';
}
.room-5::before {
  content: 'Twin Room';
}
.room-6::before {
  content: 'Deluxe Twin Room';
}
</style>