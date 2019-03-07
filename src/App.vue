<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 全屏遮罩层 -->
    <loading :style="bottom" v-show="isLoading"/>
    <player></player>
    <bottom-bar/>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Loading from "base/loading";
import BottomBar from "components/bottom-nav";
import Player from "components/player/player";

export default {
  components: {
    BottomBar,
    Player,
    Loading
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapGetters(["bottom"])
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
