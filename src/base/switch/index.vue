<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item,index) in switches"
      :key="item + index"
      :class="{'active':currentIndex === index}"
      @click="switchItem(index)"
    >
      <span>{{item}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: () => []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem(index) {
      this.$emit("switch", index);
    }
  }
};
</script>

<style lang="scss">
$color-text: rgb(124, 124, 124);
$color-border: #1db954;
.switches {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 3%;

  .switch-item {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: $color-text;
    border-bottom: 3px solid transparent;
    margin-right: 24px;
    &.active {
      color: white;
      border-bottom: 3px solid $color-border;
    }
  }
}
</style>



  
