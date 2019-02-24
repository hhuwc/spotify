import Vue from 'vue';
import App from "./App";
import router from "./router";
import store from "./store";
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload);

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

