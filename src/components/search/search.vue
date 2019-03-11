<template>
  <div class="search-main-pane" :style="bottom">
    <p class="search-text" :style="[textBGC]">Search</p>
    <div class="fake-input" :style="[inputTopStyle]" @click="click">
      <span>
        <i class="spfont sp-search"/>&nbsp;
        Playlists,songs
      </span>
    </div>
    <scroll class="tags-scroll" :listenScroll="true" @scroll="scroll">
      <div class="search-scroll-wrapper">
        <div class="title">浏览全部</div>
        <div class="tags">
          <div
            class="tag"
            v-for="item in Imgs"
            :key="item.name"
            :style="{'background-color':`${item.bgc}`}"
          >
            <div class="name">{{item.name}}</div>
            <img src="./hiphop.jpg" alt>
          </div>
        </div>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Scroll from "base/scroll";
import Imgs from "./fakeData.js";

export default {
  name: "search-main",
  components: {
    Scroll
  },
  data() {
    return {
      Imgs,
      scrollY: 0,
      inputTop: 140,
      bgcPos: 50
    };
  },
  beforeRouteEnter(to, from, next) {
    // resize 事件引起不能滚动
    next(vm => vm.$refs.scroll && vm.$refs.scroll.refresh());
  },
  computed: {
    ...mapGetters(["bottom"]),
    inputTopStyle() {
      return {
        top: `${this.inputTop}px`
      };
    },
    textBGC() {
      return {
        background: `linear-gradient(160deg,
      rgb(169, 169, 169) 0%,
      rgb(17, 17, 17) ${this.bgcPos}%)`
      };
    }
  },
  watch: {
    scrollY() {
      if (this.scrollY >= 210) {
        this.bgcPos = 0;
        this.inputTop = 0;
      } else {
        this.bgcPos = 50 * (1 - this.scrollY / 210);
        this.inputTop = 140 * (1 - this.scrollY / 210);
      }
    }
  },
  methods: {
    scroll({ y }) {
      this.scrollY = Math.abs(y);
    },
    click() {
      this.$router.push({
        path: "/search/input"
      });
    }
  }
};
</script>
<style lang="scss">
@import "./search.scss";
</style>
