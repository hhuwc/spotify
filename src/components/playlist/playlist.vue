<template>
  <transition name="playlist">
    <div class="some-playlist clearfix" :style="bottom">
      <div class="title-block" :style="titleBGC">
        <span class="title-left">
          &nbsp;
          <i class="spfont sp-left" @click="$router.back(-1)"></i>
        </span>
        <span class="title-right">
          <i class="spfont sp-loved" v-if="isListLiked" style="color:#1db954;" @click="disLikeList(id)"></i>
          <i class="spfont sp-love" v-else @click="likeList(listData)"></i>
          &nbsp;
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
      <div class="play-button" :style="buttonTop" @click="playThisList(songs)">PLAY</div>
      <scroll class="song-list" @scroll="scroll" :listenScroll="true">
        <div class="scroll-block">
          <song v-for="item in songs" :key="item.id" :info="item"></song>
        </div>
      </scroll>

      <loading v-show="isLoading"></loading>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import Scroll from "base/scroll";
import Loading from "base/loading";
import Song from "../song";
import { get } from "common/http";
import * as types from "../../store/mutationTypes.js";
export default {
  name: "playlist",
  components: {
    Scroll,
    Song,
    Loading
  },
  data() {
    return {
      scrollY: 0,
      id: "",
      name: "",
      picUrl: "",

      // 图片主色彩这个由python计算之后返回
      mainColor: [17, 17, 17],
      songs: [],
      isLoading: true
    };
  },
  computed: {
    ...mapGetters(["bottom", "favoriteListIds"]),
    ...mapState(["personalized"]),

    isListLiked() {
      return this.favoriteListIds.includes(this.id);
    },

    listData() {
      return {
        id: this.id,
        name: this.name,
        picUrl: this.picUrl
      };
    },

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

    // 标题部分 按钮到达最上部时的状态
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

      // 高斯模糊效果
      let blur = y >= 275 ? 5 : (y / 275) * 5;

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
    },
    songs(val) {
      if (val.length !== 0) {
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      }
    }
  },

  mounted() {
    // 第一步骤请求 歌单中的信心得到歌单里面歌曲信息
    // 第二部替换图片  并计算背景颜色
  },
  methods: {
    ...mapActions(["playThisList"]),
    ...mapMutations({
      likeList: types.LIKE_LIST,
      disLikeList: types.DISLIKE_LIST
    }),
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
    async getSongs() {
      // 获取歌曲

      try {
        let resData = await get("/node/playlist/detail", { id: this.id });
        let songs = resData.playlist.tracks;
        this.songs.splice(
          0,
          0,
          ...songs
            .map((item, index) => {
              return {
                name: item.name,
                picUrl: item.al && item.al.picUrl,
                id: item.id,
                author: item.ar && item.ar && item.ar[0].name,
                duration: item.dt
              };
            })
            .splice(0, 25)
        );
      } catch (error) {
        console.log(error);
      }
    },
    async calcMainColor() {
      // 计算主要颜色
      try {
        let resData = await get("/py/calc_color", { picUrl: this.picUrl });
        this.mainColor = resData.color;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>


