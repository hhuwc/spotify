import { PLAYMODE } from "common/config";

const state = {
  // 个性化推荐的歌曲
  personalized: [],
  // 最近播放的歌曲
  recentPlay: [],
  // 收藏的歌单
  favoriteList: [],
  // 收藏的歌曲
  favoriteSong: [],

  // 全屏播放
  fullScreen: false,
  // 是否播放
  playing: true,

  // 播放列表
  playList: [],

  // 当前播放的歌曲索引
  currentIndex: -1,

  // 歌曲url
  mp3: "",

  isLoading: true,

  mode: PLAYMODE.random

};

export default state;