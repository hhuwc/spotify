<template>
  <div class="home-page" :style="bottom">
    <router-link tag="span" class="setting" :style="settingStyle" to="/setting">
      <i class="spfont sp-setting"></i>
    </router-link>

    <scroll class="scroll-wrapper" @scroll="scroll" :listenScroll="true">
      <div class="scroll-block">
        <recent-play></recent-play>
        <recommend-list title="专为你打造" :musics="personalized"></recommend-list>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>
<script>
import RecentPlay from "./recent-play";
import { mapGetters, mapState, mapActions } from "vuex";
import * as types from "../../store/mutationTypes.js";
import RecommendList from "./recommend-list";
import Scroll from "base/scroll";

export default {
  name: "home-page",
  components: {
    RecentPlay,
    RecommendList,
    Scroll
  },
  data() {
    return {
      scrollY: 0
    };
  },
  watch: {
    personalized(val, oldVal) {
      if (val.length !== 0) {
      }
    }
  },
  computed: {
    ...mapGetters(["bottom"]),
    ...mapState(["personalized"]),

    settingStyle() {
      let y = Math.abs(this.scrollY);
      let scale = y >= 50 ? 0 : 1 - y / 50;
      let alpha = y >= 50 ? 0 : 1 - y / 50;

      // 高斯模糊效果
      let blur = y >= 50 ? 5 : (y / 50) * 5;

      const prefix = ["-webkit-", "-moz-", "-ms-", ""];
      const filter = {};
      prefix.forEach(val => {
        filter[`${val}filter`] = `blur(${blur}px)`;
      });

      return {
        opacity: alpha,
        transform: `scale(${scale})`,
        ...filter
      };
    }
  },

  mounted() {
    this.setLoading();
    this.getPersonalized();
  },

  methods: {
    ...mapActions(["getPersonalized", "setLoading"]),
    scroll({ y }) {
      this.scrollY = y;
    }
  }
};
</script>
<style lang="scss">
$--background-color: #111111;
$--base-color: #fcfafa;
.home-page {
  color: $--base-color;
  position: absolute;
  top: 0;
  bottom: 60px;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(160deg, #4591c2 0%, #111111 25%);

  .setting {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10;
    i.spfont {
      font-size: 25px !important;
    }
  }

  .scroll-wrapper {
    top: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    .scroll-block {
      color: $--base-color;
      padding-top: 50px;
      width: 100%;
      text-align: center;
    }
  }
}
</style>


