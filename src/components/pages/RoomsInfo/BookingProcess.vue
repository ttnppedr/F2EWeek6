<template lang="pug">
  div.booking-process
    div.process-img
      slot(name="processImg")
    div.process-description
      slot(name="prcessDescription")
</template>

<script>

export default {
  props: {},
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
  .booking-process {
    border: 1px solid #949C7C;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 300px;
    .process-img {
      background: #949C7C;
      padding: 10px;
      text-align: center;
    }
    .process-description {
      padding-top: 14px;
      padding: 14px 5px;
      text-align: center;
      font-size: 14px;
    }
  }
</style>