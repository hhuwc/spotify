import Vue from 'vue';
import Router from "vue-router";

Vue.use(Router);



import Home from "../components/home";
import Setting from '../components/setting';


import Library from "../components/library";
import Search from '../components/search/search';
import PlayList from '../components/playlist/playlist';
import Input from '../components/search/search-true';

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
      path: "/rank",
      component: Input
    },
    {
      path: "/search",
      component: Search,
      children: [{
        path: "input",
        component: Input
      },
      {
        path: "playlist/:id",
        component: Input
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
