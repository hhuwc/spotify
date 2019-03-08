<template>
  <div class="recent-play" v-if="recentData.length">
    <h1>最近播放</h1>
    <scroll class="recent-play-scroll" ref="scroll" :scroll-x="true">
      <ul ref="songs" class="recent-play-list">
        <li
          v-for="item in recentData"
          :key="item.id"
          class="song-album"
          @click="playThisSong(item)"
        >
          <div class="album-pic">
            <img :src="item.picUrl" :alt="item.name">
          </div>
          <div class="album-title">{{item.name}}</div>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from "base/scroll";
import { mapActions } from "vuex";

export default {
  components: {
    Scroll
  },
  props: {
    recentData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      num: 10
    };
  },
  methods: {
    ...mapActions(["playThisSong"])
  }
};
</script>

<style lang="scss">
.recent-play {
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
          background-color: #111;
          border-radius: 4px;
          box-shadow: 0 2px 12px 0 rgba(180, 180, 180, 0.2);

          > img {
            height: 100%;
            width: 100%;
            border-radius: 4px;
          }
        }

        .album-title {
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:last-child {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>

