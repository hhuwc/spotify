<template>
  <div class="global-player" v-if="playList.length > 0">
    <transition name="player">
      <div class="full-screen-player" v-if="fullScreen" :style="imgBgc">
        <div class="frosted-glass-img-layer"></div>
        <div class="frosted-glass-color-layer"></div>
        <div class="content">
          <div class="top-block">
            <i class="spfont sp-down" @click="setFullScreen(false)"></i>
            {{this.currentSong.name}}
            {{this.currentSong.author}}
            <i
              class="spfont sp-loved"
              v-if="isLoved"
              @click="dislike(currentSong.id)"
            ></i>
            <i class="spfont sp-love" v-else @click="like(currentSong)"></i>
            
            <i class="spfont sp-more"></i>
          </div>

          <!--唱片机部分 -->
          <div class="turntable">
            <div class="cd" :style="rotateStyle">
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
            
            <i class="spfont sp-previous" @click="jump(-1)"></i>
            <i class="spfont sp-pause-circle" v-if="playing" @click="setPlay(false)"></i>
            <i class="spfont sp-play-circle" v-else @click="setPlay(true)"></i>
            
            <i class="spfont sp-next" @click="jump(1)"></i>
            <i class="spfont sp-playlist"></i>
          </div>

          <!-- <img :src="currentSong.picUrl" alt> -->
          <span>{{this.totalTime}}</span>
          <span>{{this.currentTimeMMSS}}</span>
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
        <i class="spfont sp-pause" v-if="playing" @click="setPlay(false)"></i>
        <i class="spfont sp-play" v-else @click="setPlay(true)"></i>
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
      currentTime: 0,
      timer: null, // 切换歌曲定时器
      rotate: 0,
      rotateTimer: null //旋转动画定时器
    };
  },

  mounted() {},

  beforeDestroy() {
    clearInterval(this.rotateTimer);
    clearTimeout(this.timer);
  },
  watch: {
    playThisSong(val, oldVal) {
      if (val && !oldVal) {
        this.$refs.music.play();
        clearInterval(this.rotateTimer);
        this.rotateTimer = setInterval(() => {
          this.rotate >= 359 ? (this.rotate = 0) : (this.rotate += 1);
        }, 1000 / 60);
      }

      if (!val && oldVal) {
        this.$refs.music.pause();
        clearInterval(this.rotateTimer);
      }
    },

    currentIndex() {
      // 索引变化自动获取歌曲啊,播放就是控制索引

      // 1秒之后 播放
      clearInterval(this.rotateTimer);

      this.rotate = 0;

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setPlay(false);
        this.setMP3(this.currentSong.id);

        // 这里将歌曲添加最近播放列表
        this.addRecentPlay(this.currentSong);

        setTimeout(() => {
          this.setPlay(true);
        }, 500);
      }, 500);
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

    totalTime() {
      return this.calcDuration(this.currentSong.duration);
    },

    currentTimeMMSS() {
      return this.calcDuration(this.currentTime * 1000);
    },

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
    },
    rotateStyle() {
      return {
        transform: `rotate(${this.rotate}deg)`
      };
    }
  },
  methods: {
    ...mapMutations({
      setPlay: types.SET_PLAYING,
      setFullScreen: types.SET_FULLSCREEN,
      like: types.LOVE_SONG,
      dislike: types.DiSLIKE_SONG,
      changeIndex: types.SET_CURRENTINDEX,
      setMode: types.SET_PLAY_MODE,
      addRecentPlay: types.ADD_RECENT_PLAY
    }),
    ...mapActions(["setMP3"]),

    timeupdate(e) {
      this.currentTime = Math.ceil(e.target.currentTime);
    },
    canplaythrough(e) {
      this.canplay = true;
    },

    calcDuration(totalTime) {
      let seconds = totalTime / 1000;
      let minute = Math.floor(seconds / 60);
      seconds = Math.floor(seconds - minute * 60);
      if (minute < 10) minute = "0" + minute;
      if (seconds < 10) seconds = "0" + seconds;
      return `${minute}:${seconds}`;
    },
    // 上一首 下一首
    jump(step) {
      let currentIndex = this.currentIndex;
      const currentLength = this.playList.length;

      currentIndex = currentIndex + step;
      if (currentIndex < 0) currentIndex = currentLength - 1;
      if (currentIndex >= currentLength) currentIndex = 0;

      this.changeIndex(currentIndex);
    },

    changeMode() {
      // 模式的数字是  0 , 1 ,2
      this.mode < 2 ? this.setMode(this.mode + 1) : this.setMode(0);
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

      console.log(error);
      // 每个错误都有不同的状态码 避免出现地址过期等情况
      if (error && this.mp3) {
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
      if (this.mode === PLAYMODE.order && currentLength !== 1) {
        if (currentIndex === currentLength - 1) currentIndex = 0;
        else currentIndex++;
      }

      // 列表随即模式
      if (this.mode === PLAYMODE.random && currentLength !== 1) {
        // 随机要是等于现在的怎么办？如果列表中只有一首歌 怎么随机

        let temp;
        while (true) {
          temp = Math.ceil(Math.random() * (currentLength - 1));

          if (temp !== currentIndex) {
            currentIndex = temp;
            break;
          }
        }
      }

      this.changeIndex(currentIndex);
    }
  }
};
</script>
<style lang="scss">
@import "./player.scss";
</style>


