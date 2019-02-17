<template>
  <div class="main-tab-wrapper">
    <div class="main-tab">
      <router-link tag="div" class="tab-item" to="/home">
        <i class="spfont sp-home"></i>
        <span>Home</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/search">
        <i class="spfont sp-search"></i>
        <span>Search</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/library">
        <i class="spfont sp-library"></i>
        <span>Your Library</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/premium">
        <i class="spfont sp-spotify"></i>
        <span>Premium</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
$background: #202427;
$plain-color: #abafb2;
$active-color: #fefefe;

.main-tab-wrapper {
  height: 60px;
  width: 100%;
  background-color: $background;
  color: $plain-color;
  position: absolute;
  bottom: 0;
  z-index: 10;

  .main-tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    .tab-item {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;

      &.router-link-active {
        color: $active-color;
      }

      > i {
        font-size: 25px;
      }
      > span {
        font-size: 12px;
      }
    }
  }
}
</style>
