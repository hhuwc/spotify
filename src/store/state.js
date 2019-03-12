import { PLAYMODE } from "common/config";
import { getLoveSongs, getPlayHistory, getQueryHistory, getLoveLists } from "common/storage";

const state = {
  // 个性化推荐的歌曲
  personalized: [],
  // 最近播放的歌曲
  recent: getPlayHistory(),
  // 收藏的歌单
  favoriteList: getLoveLists(),
  // 收藏的歌曲
  favoriteSong: getLoveSongs(),

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

  mode: PLAYMODE.order,

  searchHistory: getQueryHistory()
};

export default state;