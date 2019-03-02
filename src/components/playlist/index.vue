<template>
  <transition name="playlist">
    <div class="some-playlist clearfix" :style="bottom">
      <div class="title-block" :style="titleBGC">
        <span class="title-left">
          &nbsp;
          <i class="spfont sp-left" @click="$router.back(-1)"></i>
        </span>
        <span class="title-right">
          <i class="spfont sp-love"></i>&nbsp;
          <i class="spfont sp-more"></i>&nbsp;
        </span>
        <div class="title-content">{{this.title}}</div>
      </div>
      <div class="intro" :style="introBlockBGC">
        <div class="intro-info" :style="alpha">
          <img :src="picUrl" alt>
          
          <p>{{this.title}}rqwfrsadfasdfgasdfasdfszfdASassadfasdfasdfasdfweqgqebvasdgasdfgasdasgghasfasdf</p>
        </div>
      </div>
      <div class="play-button" :style="buttonTop">PLAY</div>
      <scroll class="song-list" @scroll="scroll" :listenScroll="true">
        <div class="scroll-block">
          <div class="item" v-for="n in 100" :key="n">scroll list</div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import Scroll from "base/scroll";
export default {
  name: "playlist",
  components: {
    Scroll
  },
  data() {
    return {
      scrollY: 0,
      title: "歌曲标题",
      picUrl:
        "https://p1.music.126.net/VJTPl12r4jKIThmjy5ROTg==/109951163887710551.jpg",
      // 歌曲描述
      disc: "",
      // 图片主色彩
      bgc: ""
    };
  },
  computed: {
    ...mapGetters(["bottom"]),

    // 按钮的top值
    buttonTop() {
      let top = 300 + this.scrollY;

      if (top <= 50) top = 50;

      if (top > 300) top = 300;

      return {
        top: top + "px"
      };
    },

    // 标题部分的背景透明度
    titleBGC() {
      let y = Math.abs(this.scrollY);

      let alpha = y >= 250 ? 1 : 0;

      return {
        background: `linear-gradient(180deg, rgba(151, 117, 34, ${alpha}) 0%, rgba(17, 17, 17, ${alpha}) 100%)`
      };
    },
    // 图片介绍部分的渐变色背景
    introBlockBGC() {
      let y = Math.abs(this.scrollY);
      let buttonHeight = 50;

      // 可以滚动的区块范围
      let pos1 = ((350 - 1.5 * buttonHeight - y) / 350) * 100;

      let pos2 = ((350 - y) / 350) * 100;
      if (pos1 < (50 / 350) * 100) pos1 = (50 / 350) * 100;
      if (pos2 < pos1) pos2 = pos1;

      return {
        background: `linear-gradient(180deg, rgba(151, 117, 34, 1) 0%, rgba(74, 62, 24, 1) ${pos1}%, rgba(17, 17, 17, 1) ${pos2}%)`
      };
    },
    // 图片透明度以及大小设置
    alpha() {
      let y = Math.abs(this.scrollY);
      let alpha = y > 300 ? 0 : 1 - y / 300;
      return {
        opacity: alpha,
        transform: `scale(${alpha * 1})`
      };
    }
  },

  created() {},

  mounted() {
    // 第一步骤请求 歌单中的信心得到歌单里面歌曲信息
    // 第二部替换图片  并计算背景颜色

    console.log("组件加载完成");
  },
  methods: {
    scroll({ y }) {
      this.scrollY = y;
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>


