<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <h1 class="mini-player" v-if="showMiniBar">mini播放器</h1>
    <bottom-bar/>
  </div>
</template>

<script>
import BottomBar from "components/bottom-nav";
import { mapState } from "vuex";
export default {
  components: {
    BottomBar
  },
  computed: {
    ...mapState(["showMiniBar"])
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
  position: relative;

  .mini-player {
    color: #fff;
    background-color: red;
    height: 50px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 60px;
  }
}
</style>
