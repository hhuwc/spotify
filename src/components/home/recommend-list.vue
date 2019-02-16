<template>
  <div class="recommend-list">
    <h1>{{title}}</h1>

    <ul ref="songs" class="recommend-list-list">
      <li v-for="music in musics" :key="music.name" class="song-album">
        <div class="album-pic">
          <i class="spfont sp-spotify"></i>
          <img :src="music.picUrl" alt>
        </div>
        <div class="album-title">{{music.name}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    // 推荐歌曲
    musics: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      num: 10
    };
  }
};
</script>

<style lang="scss">
.recommend-list {
  margin-top: 22px;
  > h1 {
    font-size: 20px;
    text-align: center;
    font-weight: 500;
  }

  .recommend-list-list {
    .song-album {
      margin-top: 22px;
      margin-bottom: 22px;
      .album-pic {
        height: 250px;
        width: 250px;
        margin: 0 auto;
        background-color: #111;
        margin-bottom: 5px;
        position: relative;
        .sp-spotify {
          position: absolute;
          left: 10px;
          top: 10px;
        }
        img {
          height: 100%;
          width: 100%;
        }
      }
      .album-title {
        padding: 0 40px;
        font-size: 16px;
        line-height: 1.5;
      }
    }
  }
}
</style>


