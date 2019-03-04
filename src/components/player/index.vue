<template>
  <div class="global-player" v-if="playList.length > 0">
    <div class="full-screen" v-if="fullScreen">全屏状态</div>
    <div class="mini">
      <div class="mini-progress-bar" :style="{width:`${this.progress}%`}"></div>
      <img
        @click="click('图片')"
        src="http://p2.music.126.net/IyesOjXfwz5131f9PI7P5g==/109951163167688340.jpg"
        alt
      >
      <span class="music-info" @click="click('文字')">
        {{this.name}}
        <i class="spfont sp-dot"></i>
        {{this.author}}
      </span>
      <span class="action">
        <i class="spfont" :class="playing ? 'sp-stop' : 'sp-play' "></i>
      </span>
    </div>
    <audio id="music" :src="mp3"></audio>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "global-player",
  data() {
    return {
      author: "S.H.E",
      name: "你曾是少年",
      progress: 35,
      mp3:
        "http://m10.music.126.net/20190305000622/8da55f63206e04203e5be7d218a5a2fd/ymusic/7649/385a/3e35/4a4539ebfbb7b9f8d95ab9fb111471ed.mp3"
    };
  },

  mounted() {
    console.log("全局播放器组件");
  },
  computed: {
    ...mapState(["playing", "fullScreen", "playList"])
  },
  methods: {
    click(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss">
$-z-index-1: 100;
$-z-index-2: 110;
$--mini-height: 55px;
.global-player {
  height: $--mini-height;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;

  .mini {
    position: relative;
    z-index: $-z-index-1;
    height: $--mini-height;
    line-height: $--mini-height;
    background-color: rgb(32, 36, 39);
    color: rgb(252, 250, 250);
    box-shadow: 0 -2px 2px -2px #aaa;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .music-info {
      margin-left: 15px;
      margin-right: 15px;
      width: 150px;

      flex-grow: 1;
      height: $--mini-height - 2px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      //试了试这样可以
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #ccc;
      font-size: 14px;

      > .sp-dot {
        color: #fff;
      }
    }

    > img {
      height: $--mini-height - 2px;
      width: $--mini-height;
    }
    > .action {
      height: $--mini-height - 2px;
      width: $--mini-height;
      position: relative;
      > i.spfont {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .mini-progress-bar {
      position: absolute;
      z-index: $-z-index-2;
      top: -1px;
      width: 15%; //这个就是播放器进度显示条
      background-color: white;
      height: 1px;
    }
  }
  .full-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 150;
  }
}
</style>


