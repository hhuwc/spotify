<template>
  <div class="loading-wrapper">
    <span>
      <i class="spfont sp-loading" :style="style"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 50
    }
  },
  computed: {
    style() {
      return {
        fontSize: this.size + "px"
      };
    }
  }
};
</script>

<style lang="scss">
$--main-green: #1db954;

$--background-color: #111111;
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(720deg);
  }
}
.loading-wrapper {
  color: $--main-green;
  background-color: $--background-color;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  > span {
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);

    > .sp-loading {
      display: inline-block;
      animation: spin 2s infinite linear;
    }
  }
}
</style>


