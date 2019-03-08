<template>
  <div class="recommend-list">
    <h1>{{title}}</h1>

    <ul ref="songs" class="recommend-list-list">
      <li v-for="music in musics" :key="music.name" class="song-album" @click="click(music.id)">
        <div class="album-pic">
          <i class="spfont sp-spotify"></i>
          <img v-lazy="music.picUrl" alt>
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
  },
  methods: {
    click(id) {
      this.$router.push({
        path: `/home/playlist/${id}`
      });
    }
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
    display: inline-flex;
    justify-content: center;
    flex-wrap: wrap;
    .song-album {
      margin: 10px 10px;

      .album-pic {
        height: 150px;
        width: 150px;
        margin: 0 auto;
        background-color: #111;
        margin-bottom: 5px;
        position: relative;
        border-radius: 2px;
        .sp-spotify {
          position: absolute;
          left: 10px;
          top: 10px;
        }
        img {
          height: 100%;
          width: 100%;
          border-radius: 2px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
      .album-title {
        width: 150px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 30px;
      }
    }
  }
}
</style>


