import * as types from './mutationTypes';

const mutations = {

  [types.SET_PLAYING](state, flag) {
    state.playing = flag;
  },

  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag;
  },

  [types.SET_PERSONALIZED](state, personalized) {
    state.personalized = personalized;
  },
  [types.ADD_MUSIC](state, music) {
    // 往歌单中添加歌曲
    state.playList.push(music);
  },
  // 设置当前索引
  [types.SET_CURRENTINDEX](state, index) {
    state.currentIndex = index;
  },

  // 获取url
  [types.SET_MP3_URL](state, url) {
    state.mp3 = url;
    // 观察url 失效问题
    // state.mp3 = "http://m10.music.126.net/20190307144532/cde67628fa567a3bb5621033ad1cbbc2/ymusic/f29a/69f0/e7de/42786ec417ad8b86eb588d96ee18d103.mp3";
  },
  [types.SET_LOADING](state, flag) {
    state.isLoading = flag;
  },

  // 喜欢歌曲
  [types.LOVE_SONG](state, music) {
    state.favoriteSong.push(music);
  },
  // 取消喜欢歌曲
  [types.DiSLIKE_SONG](state, id) {
    let index = state.favoriteSong.findIndex(el => el.id == id);
    if (index > -1) state.favoriteSong.splice(index, 1);
  },

  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },

  // 添加最近播放的逻辑
  [types.ADD_RECENT_PLAY](state, music) {
    let index = state.recent.findIndex(el => el.id == music.id);
    if (index == -1) state.recent.splice(0, 0, music);
    else {
      state.recent.splice(index, 1);
      state.recent.splice(0, 0, music);
    }

  }


};

export default mutations;