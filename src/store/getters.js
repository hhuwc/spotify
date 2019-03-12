
// 底部mini播放器会将页面顶起
export const bottom = state =>
  state.playList.length > 0 ? ({ bottom: "116px" }) : ({ bottom: "60px" });


export const currentSong = state =>
  state.playList[state.currentIndex] || {}


export const favoriteSongIds = state => state.favoriteSong.map(item => item.id);


export const favoriteListIds = state => state.favoriteList.map(item => item.id);
