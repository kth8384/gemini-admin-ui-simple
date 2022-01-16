/*
 *
 *  *    Copyright 2020-2021 Luter.me
 *  *
 *  *    Licensed under the Apache License, Version 2.0 (the "License");
 *  *    you may not use this file except in compliance with the License.
 *  *    You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *    Unless required by applicable law or agreed to in writing, software
 *  *    distributed under the License is distributed on an "AS IS" BASIS,
 *  *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  *    See the License for the specific language governing permissions and
 *  *    limitations under the License.
 *
 */

import config from "@/config";
import { App } from "vue-demi";
import { createRouter, createWebHashHistory } from "vue-router";
import { regRouterGuide } from "./guard";
export const NotFoundPageRouteSepPage = {
  path: "/:catchAll(.*)*",
  name: "NotFound",
  hidden: true,
  component: () => import("@/views/base/error/404.vue"),
};
//公共路由
const routes = [
  //登录
  {
    path: "/login",
    name: "Login",
    meta: { hidden: true },
    component: () => import("@/views/base/login/index.vue"),
  },
  // 重定向和刷新
  {
    path: "/redirect/:path(.*)",
    name: "Redirect",
    meta: { hidden: true },
    component: () => import("@/views/base/redirect/index.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
regRouterGuide(router);
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (route.path && !config.app.WHITE_LIST.includes(route.path as string)) {
      router.hasRoute(name as string) && router.removeRoute(name as string);
    }
  });
}
export const setupVueRouter = (app: App) => {
  app.use(router);
};
