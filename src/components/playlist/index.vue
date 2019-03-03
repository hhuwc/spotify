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
        <div class="title-content" :style="titleAlpha">{{this.name}}</div>
      </div>
      <div class="intro" :style="introBlockBGC">
        <div class="intro-info" :style="imgAlpha">
          <img :src="picUrl" alt>

          <p>{{this.name}}</p>
        </div>
      </div>
      <div class="play-button" :style="buttonTop">PLAY</div>
      <scroll class="song-list" @scroll="scroll" :listenScroll="true">
        <div class="scroll-block">
          <song v-for="item in songs" :key="item.id" :info="item"></song>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Scroll from "base/scroll";
import Song from "../song";
import axios from "axios";
export default {
  name: "playlist",
  components: {
    Scroll,
    Song
  },
  data() {
    return {
      scrollY: 0,
      id: "",
      name: "",
      picUrl: "",
      // 歌曲描述
      disc: "",
      // 图片主色彩这个由python计算之后返回
      mainColor: [17, 17, 17],
      songs: []
    };
  },
  computed: {
    ...mapGetters(["bottom"]),
    ...mapState(["personalized"]),

    // 按钮的top值
    buttonTop() {
      let top = 300 + this.scrollY;
      if (top <= 50) top = 50;
      if (top > 300) top = 300;
      return {
        top: top + "px"
      };
    },

    // 主要背景颜色
    mainBGC() {
      return `${this.mainColor[0]}, ${this.mainColor[1]}, ${this.mainColor[2]}`;
    },

    // 标题部分的背景透明度
    titleBGC() {
      let y = Math.abs(this.scrollY);

      let alpha = y >= 275 ? 1 : 0;

      return {
        background: `linear-gradient(180deg, rgba(${
          this.mainBGC
        }, ${alpha}) 0%, rgba(17, 17, 17, ${alpha}) 100%)`
      };
    },
    // 图片介绍部分的渐变色背景
    introBlockBGC() {
      let y = Math.abs(this.scrollY);
      // 可以滚动的区块范围
      let pos = ((350 - y) / 350) * 100;

      return {
        background: `linear-gradient(180deg, rgba(${
          this.mainBGC
        }, 1) 0%, rgba(17, 17, 17, 1) ${pos}%)`
      };
    },
    // 图片透明度以及大小设置
    imgAlpha() {
      let y = Math.abs(this.scrollY);
      let scale = y >= 275 ? 0 : 1 - y / 275;
      let alpha = y >= 275 ? 0 : 1 - y / 275;
      return {
        opacity: alpha,
        transform: `scale(${scale})`
      };
    },
    // 顶部标题透明度设置
    titleAlpha() {
      let y = Math.abs(this.scrollY);

      let alpha = y >= 275 ? 1 : y / 275;

      return {
        opacity: alpha
      };
    }
  },

  created() {
    this.getListInfo();
    this.getSongs();
  },

  watch: {
    // 监听url 变化
    picUrl() {
      this.calcMainColor();
    }
  },

  mounted() {
    // 第一步骤请求 歌单中的信心得到歌单里面歌曲信息
    // 第二部替换图片  并计算背景颜色

    console.log("组件加载完成");
  },
  methods: {
    scroll({ y }) {
      this.scrollY = y;
    },
    getListInfo() {
      let id = this.$route.params.id;
      this.id = id;

      // 直接从 vuex 获取部分信息
      let playlist = this.personalized.filter(item => item.id == id);

      // 没有数据就返回 主页
      if (playlist.length > 0) {
        this.name = playlist[0].name;
        this.picUrl = playlist[0].picUrl;
      } else {
        this.$router.push({ path: "/home" });
      }
    },
    getSongs() {
      // 获取歌曲
      axios
        .get(`/node/playlist/detail?id=${this.id}`)
        .then(res => {
          let songs = res.data.playlist.tracks;
          this.songs = songs.map(item => {
            return {
              name: item.name,
              picUrl: item.al && item.al.picUrl,
              id: item.id,
              author: item.ar && item.ar && item.ar[0].name
            };
          });
        })
        .catch(err => {
          console.log("err : ", err);
        });
    },
    calcMainColor() {
      // 计算主要颜色

      axios
        .post("/py/calc_color", { picUrl: this.picUrl })
        .then(res => {
          this.mainColor = res.data.color;
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>


