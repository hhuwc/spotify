<template>
  <div class="home-page">
    <div class="top-setting">
      <i class="spfont sp-setting"></i>
    </div>
    <loading v-if="isLoading" class="loading-rec"></loading>
    <scroll class="scroll-wrapper" @scroll="scroll" v-else>
      <div class="scroll-block">
        <recent-play></recent-play>
        <recommend-list title="专为你打造" :musics="recommends"></recommend-list>
      </div>
    </scroll>
  </div>
</template>
<script>
import RecentPlay from "./recent-play";
import RecommendList from "./recommend-list";
import Scroll from "base/scroll";
import Loading from "base/loading";
import axios from "axios";
export default {
  components: {
    RecentPlay,
    RecommendList,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: []
    };
  },
  watch: {
    recommends(newVal, oldVal) {}
  },
  computed: {
    isLoading() {
      return this.recommends.length === 0;
    }
  },

  mounted() {
    let self = this;
    axios.get("/personalized").then(function(response) {
      // handle success
      console.log(self);
      self.recommends = response.data.result.filter(
        el => el.name && el.name.toLowerCase().indexOf("vip") < 0
      );
    });
  },
  methods: {
    scroll(pos) {
      console.log(pos);
    }
  }
};
</script>
<style lang="scss">
$--background-color: #111111;
$--base-color: #fcfafa;
.home-page {
  color: $--base-color;
  background-color: $--background-color;

  // 加载中
  .loading-rec {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  // 最近播放 以及推荐歌曲部分的样式
  .scroll-wrapper {
    top: 60px;
    position: fixed;
    bottom: 60px;

    width: 100%;
    .scroll-block {
      color: $--base-color;
      background-color: $--background-color;
      width: 100%;
      text-align: center;
    }
  }

  .top-setting {
    padding-top: 27px;
    padding-bottom: 10px;
    padding-right: 12px;
    line-height: 1;
    display: flex;
    flex-flow: row-reverse;

    > i.spfont {
      font-size: 25px !important;
    }
  }
}
</style>


