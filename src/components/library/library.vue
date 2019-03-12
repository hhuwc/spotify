<template>
  <div class="library-pane" :style="bottom">
    <switches
      class="switch-block"
      :switches="switches"
      :currentIndex="currentIndex"
      @switch="change"
    ></switches>
    <scroll class="love-play-list" v-if="currentIndex === 1">
      <div>
        <div
          class="loved-list-item"
          v-for="item in favoriteList"
          :key="item.id"
          @click="click(item.id)"
        >
          <img :src="item.picUrl" alt>
          <div>
            <div>{{item.name}}</div>
            <div>{{item.playCount}} times</div>
          </div>
        </div>
      </div>
    </scroll>
    <scroll class="love-song-list" v-if="currentIndex === 0">
      <div>
        <song v-for="item in favoriteSong" :key="item.id" :info="item"></song>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import Switches from "base/switch";
import Scroll from "base/scroll";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import Song from "../song";
export default {
  components: {
    Switches,
    Scroll,
    Song
  },
  data() {
    return {
      switches: ["Musics", "Playlists"],
      currentIndex: 0
    };
  },
  computed: {
    ...mapState(["favoriteSong", "favoriteList"]),
    ...mapGetters(["bottom"])
  },
  methods: {
    change(i) {
      this.currentIndex = i;
    },
    click(id) {
      this.$router.push({
        path: `/library/playlist/${id}`
      });
    }
  }
};
</script>

<style lang="scss">
@import "./library.scss";
</style>