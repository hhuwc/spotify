<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <bottom-bar/>
  </div>
</template>

<script>
import BottomBar from "components/bottom-nav";
export default {
  components: {
    BottomBar
  }
};
</script>

<style lang="scss">
@import "theme/reset.scss";
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
