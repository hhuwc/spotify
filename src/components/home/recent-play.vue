<template>
  <div class="recent-play">
    <h1>最近播放</h1>
    <scroll class="recent-play-scroll" ref="scroll" :scroll-x="true">
      <ul ref="songs" class="recent-play-list">
        <li v-for="n in num" :key="n" class="song-album">
          <div class="album-pic"></div>
          <div class="album-title">标题{{n}}</div>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from "base/scroll";
export default {
  components: {
    Scroll
  },
  data() {
    return {
      num: 10
    };
  }
};
</script>

<style lang="scss">
.recent-play {
  padding-top: 50px;
  background: linear-gradient(
    160deg,
    rgb(69, 145, 194) 0%,
    rgb(17, 17, 17) 60%
  );

  > h1 {
    font-size: 20px;
    text-align: center;
    font-weight: lighter;
  }

  .recent-play-scroll {
    margin-top: 12px;
    .recent-play-list {
      display: inline-flex;
      .song-album {
        margin-left: 20px;

        .album-pic {
          height: 100px;
          width: 100px;
          background-color: #988907;
        }

        &:last-child {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>

