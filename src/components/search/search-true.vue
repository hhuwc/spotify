<template>
  <div class="search-true" :style="[searchTrueBGC , isFocus ?  {bottom:0} : bottom]">
    <!-- 搜索框 -->
    <div class="input-wrapper" :class="{'input-wrapper-focus':isFocus}" :style="{opacity}">
      <div class="input-block">
        <i class="spfont sp-left" @click="$router.back(-1)"></i>
        
        <input
          ref="input"
          type="text"
          v-model="query"
          @focus="focus"
          @blur="blur"
          :placeholder="isFocus ? '' : 'Search'"
        >
        <i class="spfont sp-close" v-if="query" @click="query = ''"></i>
        <i class="spfont sp-camera" v-else></i>
      </div>
    </div>
    <!-- 有搜索内容时 -->
    <scroll
      class="search-scroll"
      v-if="query"
      :pullup="true"
      :bounce="true"
      @scrollToEnd="scrollToEnd"
      ref="scrollRes"
    >
      <div class="search-result">
        <div
          class="song-item"
          v-for="item in songs"
          :key="item.id + Math.random()"
          @click="playThisSong(item)"
        >
          <!-- <i class="spfont sp-music"></i> -->
          <img v-lazy="item.picUrl" />
          <div>
            <p>{{item.name}}</p>
            <p>{{item.author}}</p>
          </div>
          <i class="spfont sp-right"></i>
        </div>
        <div class="loading-more" v-if="loadMore">
          <i class="spfont sp-loading"></i>
        </div>
      </div>
    </scroll>

    <!-- 没有搜索时  -->
    <div v-else class="no-query">
      <div class="search-trend">
        <div class="title">Hot Search</div>
        <div class="trend-block">
          <div class="hot-word" v-for="item in hots" :key="item" @click="query = item">{{item}}</div>
        </div>
      </div>
      <!-- 保存最近10条搜索记录 -->
      <div class="recent-search" v-if="searchHistory.length > 0">
        <div class="title">Recent Searches</div>
        <div class="historys">
          <div class="history" v-for="item in searchHistory" :key="item">
            <span @click="query = item">{{item}}</span>
            <i class="spfont sp-close" @click="delHistory(item)"></i>
          </div>
        </div>
        <div class="clear" @click="delHistory(null)">Clear Searches</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import { search, hots, songDetail, calcMainColor } from "./api.js";
import Scroll from "base/scroll";
import * as types from "store/mutationTypes";

// 一页默认 20个
const LIMIT = 8;
const MAX = 80;
export default {
  name: "search-true",
  components: {
    Scroll
  },
  data() {
    return {
      isFocus: true,
      query: "",

      songs: [],
      songCount: 0,
      searchTimer: null, //搜索定时器
      currentPage: 0, //默认第0页
      loadMore: false,
      hots: [], //热点搜索
      color: [17, 17, 17],
      opacity: 1
    };
  },

  beforeDestroy() {
    clearTimeout(this.searchTimer);
  },
  computed: {
    ...mapState(["searchHistory"]),
    ...mapGetters(["bottom"]),
    hasMore() {
      return this.currentPage * LIMIT < this.songCount;
    },
    searchTrueBGC() {
      return {
        background: `linear-gradient(rgb(${this.color[0]}, ${this.color[1]}, ${
          this.color[2]
        }) 0%, rgb(17, 17, 17) 60%)`
      };
    }
  },
  watch: {
    query(val) {
      // query 变化时搜索 记得防抖
      this.currentPage = 0;
      this.songCount = 0;
      this.songs = [];
      if (val && val.trim()) {
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => {
          this.search(val, 0, LIMIT);
          // 添加搜索历史
          this.addHistory(val);
        }, 500);
      } else {
        clearTimeout(this.searchTimer);
      }
    },

    songs(val) {
      if (val.length > 0) {
        //变换背景颜色
        this.calcBGC(val[0].picUrl);
        this.opacity = 0.6;

        this.$nextTick(() => {
          this.$refs.scrollRes && this.$refs.scrollRes.refresh();
        });
      }
    },
    isFocus() {
      this.$nextTick(() => {
        this.$refs.scrollRes && this.$refs.scrollRes.refresh();
      });
    }
  },
  mounted() {
    this.$refs.input.focus();

    hots()
      .then(res => {
        this.hots = res.result.hots.map(el => el.first);
      })
      .catch(err => console.log(err));
  },
  methods: {
    ...mapActions(["playThisSong"]),
    ...mapMutations({
      delHistory: types.DEL_HISTORY,
      addHistory: types.ADD_HISTORY
    }),
    focus() {
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    },
    async dealSongs(songs) {
      if (songs && songs.length > 0) {
        let songIds = songs.map(el => el.id);
        songIds = [...new Set(songIds)];

        let res = await songDetail(songIds.join(","));

        if (res.songs) {
          songs = res.songs.map(el => ({
            id: el.id,
            name: el.name,
            duration: el.dt,
            author: el.ar && el.ar[0] && el.ar[0].name,
            picUrl: el.al && el.al.picUrl
          }));

          this.songs = this.songs.concat(
            songs.filter(
              ({ id, name, duration, author, picUrl }) =>
                id && name && duration && author && picUrl
            )
          );
        }

        this.loadMore = false;
      } else {
        this.loadMore = false;
      }
    },
    // 搜索
    async search() {
      if (!this.hasMore && this.currentPage > 0) return;
      this.loadMore = true;
      try {
        let res = await search(this.query, this.currentPage * LIMIT, LIMIT);
        let songs = res.result.songs;

        if (this.currentPage == 0) {
          // 第一次搜索时
          this.songCount =
            res.result.songCount > MAX ? MAX : res.result.songCount;
          this.currentPage = 1;
        } else {
          this.currentPage++;
        }
        setTimeout(() => {
          this.dealSongs(songs);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    },

    async calcBGC(picUrl) {
      try {
        let { color } = await calcMainColor(picUrl);
        this.color = color;
      } catch (error) {
        console.error(error);
      }
    },

    scrollToEnd() {
      if (this.hasMore) {
        this.search();
      }
    }
  }
};
</script>

<style lang="scss">
@import "./search-true.scss";
</style>
