<template>
  <div class="home-page" :style="bottom">
    <div class="top-setting">
      <router-link tag="div" class="tab-item" to="/setting">
        <i class="spfont sp-setting"></i>
      </router-link>
    </div>
    <loading v-if="isLoading" class="loading-rec"></loading>
    <scroll class="scroll-wrapper" v-else>
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
  components: {
    RecentPlay,
    RecommendList,
    Scroll,
    Loading
  },
  computed: {
    ...mapGetters(["bottom"]),
    ...mapState(["personalized"]),

    isLoading() {
      return this.personalized.length === 0;
    }
  },

  mounted() {
    this.getPersonalized();
  },
  methods: {
    ...mapActions(["getPersonalized"])
  }
};
</script>
<style lang="scss">
$--background-color: #111111;
$--base-color: #fcfafa;
.home-page {
  color: $--base-color;
  background-color: $--background-color;
  position: absolute;
  top: 0;
  bottom: 60px;
  width: 100%;
  overflow: hidden;

  .top-setting {
    padding-top: 27px;
    padding-bottom: 10px;
    padding-right: 12px;
    line-height: 1;
    display: flex;
    flex-flow: row-reverse;

    i.spfont {
      font-size: 25px !important;
    }
  }

  // 加载中
  .loading-rec {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  // 最近播放 以及推荐歌曲部分的样式
  .scroll-wrapper {
    top: 60px;
    position: absolute;
    bottom: 0;
    width: 100%;
    .scroll-block {
      color: $--base-color;
      background-color: $--background-color;
      width: 100%;
      text-align: center;
    }
  }
}
</style>


