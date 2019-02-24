import axios from "axios";
import * as types from "./mutationTypes";

export const getPersonalized = ({ commit }) => {

  setTimeout(() => {
    axios.get("/personalized").then(function (res) {
      let personalized = res.data.result.filter(
        el => el.name && el.name.toLowerCase().indexOf("vip") < 0
      );

      commit(types.SET_PERSONALIZED, personalized);
    });
  }, 1000);
}