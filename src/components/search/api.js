import { get } from "common/http";

// type = 1 搜索歌曲  type =1000 搜索歌单
export async function search(keywords, offset = 0, limit = 20, type = 1) {
  //   "/node/search?keywords= 海阔天空&type=1000";
  return await get("/node/search", { keywords, type, limit, offset });
}

// 热点搜索
export async function hots() {
  return await get("/node/search/hot");
}

// 歌曲详情

export async function songDetail(ids) {
  return await get("/node/song/detail", { ids });
}

export async function calcMainColor(picUrl) {
  // 计算主要颜色
  return await get("/py/calc_color", { picUrl });
}