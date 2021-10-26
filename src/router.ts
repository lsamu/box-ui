import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location:any) {
  return originalPush.call(this, location).catch((err:any) => err)
}

const routes: Array<RouteConfig> = [
  {
    path: '/:path?',
    name: 'home',
    component: () => import("./views/nav/index.vue")
  },
]


import { menu } from "./menu";

for (const item of menu.left) {
  let tmpItem: any = item;
  if (tmpItem.children && tmpItem.children.length > 0) {
    for (const item2 of item.children) {
      let tmpItem2: any = item2;
      routes.push({
        path: "/" + tmpItem2.href,
        component: () => import('./views/' + tmpItem2.href + '/index.vue'),
      })
    }
  } else {
    routes.push({
      path: "/" + tmpItem.href,
      component: () => import('./views/' + tmpItem.href + '/index.vue'),
    })
  }
}

const router = new VueRouter({
  routes,
});

export default router
