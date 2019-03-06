<template>
  <div class="loading-wrapper">
    <i class="spfont sp-loading" :style="style"></i>
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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  > .sp-loading {
    animation: spin 2s infinite linear;
  }
}
</style>


