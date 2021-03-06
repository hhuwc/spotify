import Vue from 'vue';
import Router from "vue-router";

Vue.use(Router);

import Home from "../components/home";
import Setting from '../components/setting';
import Search from '../components/search/search';
import PlayList from '../components/playlist/playlist';
import SearchTrue from '../components/search/search-true';

const loadView = (path) => () => import(/* webpackChunkName: "lazy-load" */ `components/${path}`);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "playlist/:id",
          component: PlayList
        },
      ]
    },
    {
      path: "/setting",
      component: Setting
    },

    {
      path: "/search",
      component: Search,
      children: [{
        path: "input",
        component: SearchTrue
      }]
    },
    {
      path: "/library",
      component: loadView("library/library"),
      children: [
        {
          path: "playlist/:id",
          component: PlayList
        }
      ]
    },


  ]
});
