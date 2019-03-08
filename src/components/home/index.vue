<template>
  <div class="home-page" :style="[bottom,topBGCStyle]">
    <router-link tag="span" class="setting" :style="settingStyle" to="/setting">
      <i class="spfont sp-setting"></i>
    </router-link>

    <scroll class="scroll-wrapper" @scroll="scroll" :listenScroll="true">
      <div class="scroll-block">
        <recent-play :recent-data="recent"></recent-play>
        <recommend-list title="专为你打造" :musics="personalized"></recommend-list>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>
<script>
import RecentPlay from "./recent-play";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import * as types from "../../store/mutationTypes.js";
import RecommendList from "./recommend-list";
import Scroll from "base/scroll";
import { get } from "common/http";

export default {
  name: "home-page",
  components: {
    RecentPlay,
    RecommendList,
    Scroll
  },
  data() {
    return {
      scrollY: 0,
      topBGC: [69, 141, 189],
      topBGCEnd: 25
    };
  },
  watch: {
    recent(val, oldVal) {
      if (val.length > 0) {
        this.calcMainColor(val[0].picUrl);
      }
    }
  },
  computed: {
    ...mapGetters(["bottom"]),
    ...mapState(["personalized", "recent"]),

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
    },
    topBGCStyle() {
      return {
        background: `linear-gradient(160deg, rgb(${this.topBGC[0]},${
          this.topBGC[1]
        },${this.topBGC[2]}) 0%, #111111 ${this.topBGCEnd}%)`
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
      let offSetTop = Math.abs(y);

      this.topBGCEnd = offSetTop >= 150 ? 0 : (1 - offSetTop / 150) * 25;
    },
    async calcMainColor(picUrl) {
      // 计算主要颜色
      try {
        let resData = await get("/py/calc_color", { picUrl });
        this.topBGC = resData.color;
      } catch (error) {
        console.log(error);
      }
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


