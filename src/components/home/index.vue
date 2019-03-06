<template>
  <div class="home-page" :style="bottom">
    <router-link tag="span" class="tab-item" :style="settingStyle" to="/setting">
      <i class="spfont sp-setting"></i>
    </router-link>
    <loading v-if="isLoading" class="loading-rec" :style="bottom"></loading>

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
import RecommendList from "./recommend-list";
import Scroll from "base/scroll";
import Loading from "base/loading";

export default {
  name: "home-page",
  components: {
    RecentPlay,
    RecommendList,
    Scroll,
    Loading
  },
  data() {
    return {
      scrollY: 0,
      isLoading: true
    };
  },
  watch: {
    personalized(val, oldVal) {
      //三秒延时加载
      if (val.length !== 0) {
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
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
    this.getPersonalized();
  },

  methods: {
    ...mapActions(["getPersonalized"]),
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

  .tab-item {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10;
    i.spfont {
      font-size: 25px !important;
    }
  }

  // 加载中
  .loading-rec {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
  // 最近播放 以及推荐歌曲部分的样式
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


