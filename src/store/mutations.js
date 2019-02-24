import * as types from './mutationTypes';

const mutations = {

  [types.SHOW_MINI](state) {
    state.showMiniBar = !state.showMiniBar;
  },

  [types.SET_PERSONALIZED](state, personalized) {
    state.personalized = personalized;
  }
};

export default mutations;