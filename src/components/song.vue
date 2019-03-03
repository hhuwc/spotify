<template>
  <div class="mini-song">
    <div class="mini-img">
      <img v-lazy="info.picUrl" alt>
      <i class="spfont sp-play"></i>
    </div>

    <div class="music-name-author">
      <p class="music-name">{{this.info.name}}</p>
      <p class="music-author">{{this.info.author}}</p>
    </div>

    <div class="action">
      <i class="spfont sp-love"></i>&nbsp;&nbsp;
      <i class="spfont sp-more"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "sp-song",
  props: {
    info: {
      type: Object,
      default: () => ({
        author: "",
        id: "",
        name: "",
        picUrl: ""
      })
    }
  }
};
</script>
<style lang="scss">
$--background-color: #404040;
.mini-song {
  height: 70px;
  width: 94%;
  background-color: $--background-color;
  margin: 10px auto;
  border-radius: 6px;
  box-shadow: -1px 1px 5px 0 rgba(0, 0, 0, 1);
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .mini-img {
    position: relative;
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
    height: 70px;
    width: 70px;
    background-color: #bbb;

    img {
      border-bottom-left-radius: 6px;
      border-top-left-radius: 6px;
      height: 70px;
      width: 70px;
    }
    .sp-play {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #eee;
    }
  }

  .music-name-author {
    height: 70px;
    padding: 10px;
    padding-left: 15px;
    line-height: 25px;
    flex-grow: 1;
    width: 100px;
    .music-name {
      color: #fff;
      font-size: 14px;
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .music-author {
      color: rgb(207, 207, 207);
      font-size: 12px;
    }
  }

  .action {
    height: 70px;
    width: 70px;
    line-height: 70px;

    .spfont {
      font-size: 21px;
    }
  }
}
</style>


