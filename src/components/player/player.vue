<template>
  <div class="global-player" v-if="playList.length > 0">
    <transition name="player">
      <div class="full-screen-player" v-if="fullScreen" :style="imgBgc">
        <div class="frosted-glass-img-layer"></div>
        <div class="frosted-glass-color-layer"></div>
        <div class="content">
          <div class="top-block">
            <i class="spfont sp-down" @click="setFullScreen(false)"></i>
            <i class="spfont sp-love" v-if="!isLoved" @click="like(currentSong)"></i>
            <i class="spfont sp-loved" v-else @click="dislike(currentSong.id)"></i>
            <i class="spfont sp-more"></i>
          </div>

          <!--唱片机部分 -->
          <div class="turntable">
            <div class="cd">
              <div class="border"></div>
              <div class="disk"></div>
              <img class="album" :src="currentSong.picUrl">
            </div>
          </div>

          <!-- 进度条控制 -->
          <div class="controll-progress-bar" @click="setProgress" ref="progress">
            <div class="progress-bar" :style="{width:`${this.progress}%`}"></div>
          </div>
          <!-- 控制区块 -->
          <div class="controlls">
            <i class="spfont" :class="`sp-${this.modeIcon}`" @click="changeMode"></i>
            
            <i class="spfont sp-previous" @click="prev"></i>
            <i class="spfont sp-play-circle" v-if="!playing" @click="play"></i>
            <i class="spfont sp-pause-circle" v-else @click="pause"></i>
            <i class="spfont sp-next" @click="next"></i>
            <i class="spfont sp-playlist"></i>
          </div>

          <!-- <img :src="currentSong.picUrl" alt> -->
        </div>
      </div>
    </transition>

    <div class="mini">
      <div class="mini-progress-bar" :style="{width:`${this.progress}%`}"></div>
      <img @click="setFullScreen" :src="currentSong.picUrl" alt>
      <span class="music-info" @click="setFullScreen">
        {{this.currentSong.name}}
        <i class="spfont sp-dot"></i>
        {{this.currentSong.author}}
      </span>
      <span class="action">
        <i class="spfont sp-stop" v-if="playing" @click="pause"></i>
        <i class="spfont sp-play" v-else @click="play"></i>
      </span>
    </div>
    <audio
      id="audio"
      ref="music"
      :src="mp3"
      :loop="loop"
      @timeupdate="timeupdate"
      @canplaythrough="canplaythrough"
      @error="error"
      @ended="ended"
    ></audio>
  </div>
</template>
<script>
import * as types from "store/mutationTypes";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { debounce } from "throttle-debounce";
import { on, off } from "common/dom";
import { PLAYMODE } from "common/config";
export default {
  name: "global-player",
  data() {
    return {
      canplay: false,
      currentTime: 0
    };
  },

  mounted() {},

  beforeDestroy() {},
  watch: {
    playThisSong(val, oldVal) {
      if (val && !oldVal) this.$refs.music.play();

      if (!val && oldVal) this.$refs.music.pause();
    },

    currentIndex() {
      // 索引变化自动获取歌曲啊,播放就是控制索引
      this.setPlay(false);

      this.setMP3(this.currentSong.id);

      // 1秒之后 播放
      setTimeout(() => {
        this.setPlay(true);
      }, 1000);
    }
  },
  computed: {
    ...mapState([
      "playing",
      "fullScreen",
      "playList",
      "mp3",
      "currentIndex",
      "mode"
    ]),

    ...mapGetters(["currentSong", "favoriteSongIds"]),

    imgBgc() {
      return {
        backgroundImage: `url(${this.currentSong.picUrl})`
      };
    },

    modeIcon() {
      if (this.mode === PLAYMODE.loop) return "loop";
      if (this.mode === PLAYMODE.order) return "order";
      return "random";
    },

    loop() {
      return this.mode === PLAYMODE.loop;
    },

    progress() {
      return (this.currentTime * 1000 * 100) / this.currentSong.duration;
    },
    isLoved() {
      return this.favoriteSongIds.includes(this.currentSong.id);
    },
    playThisSong() {
      return this.playing && this.canplay;
    }
  },
  methods: {
    ...mapMutations({
      setPlay: types.SET_PLAYING,
      setFullScreen: types.SET_FULLSCREEN,
      like: types.LOVE_SONG,
      dislike: types.DiSLIKE_SONG,
      changeIndex: types.SET_CURRENTINDEX
    }),
    ...mapActions(["setMP3"]),
    play() {
      this.setPlay(true);
    },
    pause() {
      this.setPlay(false);
    },
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
    },
    canplaythrough(e) {
      this.canplay = true;
    },

    prev() {
      console.log("播放列表前一首");
    },
    next() {
      console.log("播放列表下一首");
      this.changeIndex(0);
    },

    changeMode() {
      console.log("切换模式");
    },
    setProgress(e) {
      //
      this.$refs.music.currentTime =
        ((this.currentSong.duration / 1000) * e.offsetX) /
        this.$refs.progress.clientWidth;

      // 设置了进度条之后立即播放这首歌
      this.$refs.music.play();
      this.setPlay(true);
    },
    error(e) {
      const { error } = this.$refs.music;
      if (!error) return;
      const { code } = error;
      //  4 指的是 地址无效
      if (code === 4 && this.mp3) {
        this.canplay = false;
        this.setMP3(this.currentSong.id);
      }
    },

    ended() {
      // 单曲循环不用管 已经设置了循环属性
      if (this.mode === PLAYMODE.loop) return;

      // 歌曲播放结束具体就是看 目前的播放模式
      let currentIndex = this.currentIndex;
      const currentLength = this.playList.length;

      // 列表循环模式
      if (this.mode === PLAYMODE.order) {
        if (currentIndex === currentLength - 1) currentIndex = 0;
        else currentIndex++;
      }

      // 列表随即模式
      if (this.mode === PLAYMODE.random) {
        let temp = Math.ceil(Math.random() * (currentLength - 1));
        if (temp !== currentIndex) currentIndex = temp;
      }

      this.changeIndex(currentIndex);
    }
  }
};
</script>
<style lang="scss">
@import "./player.scss";
</style>


