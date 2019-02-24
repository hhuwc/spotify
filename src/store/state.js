
// 播放模式
const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};

const state = {
  // 个性化推荐的歌曲
  personalized: [],
  // 最近播放的歌曲
  recentPlay: [],
  // 收藏的歌单
  favoriteList: [],
  // 收藏的歌曲
  favoriteSong: [],

  showMiniBar: false,

};

export default state;