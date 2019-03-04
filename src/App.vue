<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
    <bottom-bar/>
  </div>
</template>

<script>
import BottomBar from "components/bottom-nav";
import Player from "components/player";

export default {
  components: {
    BottomBar,
    Player
  }
};
</script>

<style lang="scss">
@import "theme/reset.scss";
@import "theme/util.scss";
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  position: relative;
}
</style>
