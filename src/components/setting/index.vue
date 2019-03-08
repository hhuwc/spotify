<template>
  <transition name="setting-info">
    <div class="setting-info">
      <h1 class>敬请期待</h1>
    </div>
  </transition>
</template>
<script>
export default {};
</script>
<style lang="scss">
.setting-info {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 150;
  background-color: #ccc;
}
.setting-info-enter-active,
.setting-info-leave-active {
  transition: all 0.3s;
}
.setting-info-enter,
.setting-info-leave-to {
  transform: translateX(100%);
}
</style>