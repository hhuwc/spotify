<template>
  <div class="loading-wrapper">
    <div class="loading-circle" :style="style">
      <div class="circle-inner"></div>
    </div>
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
        height: this.size + "px",
        width: this.size + "px"
      };
    }
  }
};
</script>

<style lang="scss">
$--main-green: #1db954;
$--back-color: #b2d9c0;
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
  .loading-circle {
    background: rgb(29, 185, 84);
    background: linear-gradient(
      0deg,
      rgba(29, 185, 84, 1) 0%,
      rgba(252, 252, 255, 1) 20%,
      rgba(252, 252, 255, 1) 100%
    );
    position: relative;
    border-radius: 100%;

    animation: spin 2s infinite linear;
    margin: 0 auto;

    .circle-inner {
      height: 80%;
      width: 80%;
      background-color: $--background-color;
      border-radius: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>


