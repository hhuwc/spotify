import Vue from 'vue';
import Router from "vue-router";

Vue.use(Router);

import InputTest from '../components/input-test';
import InputTestA from '../components/input-test-1';


import Home from "../components/home";
import Library from "../components/library";

import PlayList from '../components/test4';
import Setting from '../components/test3';
import Search from '../components/search';

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
        {
          path: "setting",
          component: Setting
        }
      ]
    },
    {
      path: "/search",
      component: Search,
      children: [{
        path: "singer/:id",
        component: InputTestA
      },
      {
        path: "playlist/:id",
        component: InputTestA
      }]
    },
    {
      path: "/library",
      component: Library,
      children: [
        {
          path: "playlist/:id",
          component: PlayList
        }
      ]
    },


  ]
});
