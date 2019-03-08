import axios from "axios";
import * as types from "./mutationTypes";
import { get } from "common/http";
import { async } from "q";

// 获取首页推荐数据
export async function getPersonalized({ commit }) {

  try {
    let { result } = await get("/node/personalized");
    commit(types.SET_PERSONALIZED, result);

  } catch (error) {

  }
};

// music = { 保存的歌曲 图片 作者等，还有歌曲id }
export async function playThisSong({ commit, state, getters }, music) {

  // 一开始停止播放
  // commit(types.SET_PLAYING, false);

  const { playList } = state;
  const { length } = playList;
  let index = playList.findIndex(el => el.id == music.id);
  if (index === -1) {
    commit(types.ADD_MUSIC, music);
    // 添加一个新元素之后 最后一个元素的索引刚好为原来的长度
    commit(types.SET_CURRENTINDEX, length);
  } else {
    commit(types.SET_CURRENTINDEX, index);
  }
  // 设置全屏
  commit(types.SET_FULLSCREEN, true);

}
// 看看是否长期有效
// http://p2.music.126.net/QYI8P7bfmwUKxH3Kll95LQ==/18878614649179588.jpg

async function getMP3URL(musicId) {
  let url;
  try {
    let resData = await get("/node/song/url", {
      id: musicId
    });
    url = resData.data[0].url;
  } catch (error) {
    console.error(error);
  }
  return url;
}



export async function setMP3({ commit, state }, musicId) {
  try {
    let url = await getMP3URL(musicId);
    // 地址是否更新
    if (state.mp3 !== url) {
      commit(types.SET_MP3_URL, url);
    }

  } catch (error) {
    console.log(error);
  }
}


export async function setLoading({ commit }) {
  commit(types.SET_LOADING, true);
  setTimeout(() => {
    commit(types.SET_LOADING, false);
  }, 2500);
}

