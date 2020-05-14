/*
 * @Author: wanglijuan01
 * @Date: 2020-02-29 10:46:08
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-03-04 11:58:47
 * @Description: 前端路由
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Authority from '@components/common/no-authority/Index.vue';
import HOME from './home/index.js';
import Home from '@views/Home.vue';

import Layout from '@views/home/Layout.vue';
const NOT_FOUND = resolve => require(['@components/common/404/not-found.vue'], resolve);
const LOGIN = resolve => require(['@components/common/login/login.vue'], resolve);
console.log(Layout, 'Layout');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '说明页'
    }
  },
  {
    path: '/no-authority',
    name: 'authority',
    component: Authority,
    meta: {
      title: '没权限'
    }
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    meta: {
      title: '布局'
    },
    children: [...HOME]
  },
  {
    path: '/404',
    name: 'notFound',
    component: NOT_FOUND,
    meta: {
      title: '404'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LOGIN,
    meta: {
      title: '开发环境种cooki用'
    }
  }
  // {
  //   path: '*',
  //   component: NOT_FOUND,
  //   name: 'notFound',
  //   meta: {
  //     title: '404'
  //   }
  // }
];
console.log(routes, 'routes');

const router = new VueRouter({
  mode: 'history',
  base: '/wxadmin/view',
  routes
});

export default router;
