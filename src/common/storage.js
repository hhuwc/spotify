// 搜索历史,最近播放存储
const LOVESONGS = "LOVESONGS";
const PLAYHISTORY = "PLAYHISTORY";
const QUERYHISTORY = "QUERYHISTORY";
const LOVELISTS = "LOVELISTS";

let arr = [{ "name": "LA On A Saturday Night (James Carter Remix)", "picUrl": "http://p1.music.126.net/Npt1wmeEpe4sJANWHsrkgw==/109951163711867596.jpg", "id": 1323975080, "author": "Hearts & Colors", "duration": 162403 }, { "name": "海芋恋", "picUrl": "http://p2.music.126.net/85OraraqsQsBrce52g1kPg==/54975581401100.jpg", "id": 168039, "author": "萧敬腾", "duration": 240405 }, { "name": "爱的城堡", "picUrl": "http://p2.music.126.net/Vyde-mKO81dDoaqMMOvovg==/109951163423041850.jpg", "id": 327690, "author": "卓文萱", "duration": 188082 }]

export const getLoveSongs = () => {
  let songs = JSON.parse(localStorage.getItem(LOVESONGS));

  return (songs && songs.length > 0) ? songs : arr;
}
export const setLoveSongs = (data) => {
  if (data) {
    localStorage.setItem(LOVESONGS, JSON.stringify(data));
  }
}

export const getLoveLists = () => {
  let lists = JSON.parse(localStorage.getItem(LOVELISTS));

  return lists ? lists : [];
}
export const setLoveLists = (data) => {
  if (data) {
    localStorage.setItem(LOVELISTS, JSON.stringify(data));
  }
}


export const getPlayHistory = () => {
  let songs = JSON.parse(localStorage.getItem(PLAYHISTORY));

  return (songs && songs.length > 0) ? songs : arr;

}

export const setPlayHistory = (data) => {
  if (data) {
    localStorage.setItem(PLAYHISTORY, JSON.stringify(data));
  }
}

export const getQueryHistory = () => {
  let searches = JSON.parse(localStorage.getItem(QUERYHISTORY));

  return searches ? searches : [];

}

export const setQueryHistory = (data) => {
  if (data) {
    localStorage.setItem(QUERYHISTORY, JSON.stringify(data));
  }
}
