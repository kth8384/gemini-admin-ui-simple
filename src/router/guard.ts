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

import { Router, RouteRecordRaw } from "vue-router";
import i18n from "@/locales/index";
import { useUserStoreOutSetUp } from "@/store/modules/user";
import config, { getAppConfig } from "@/config";
import { useRouterStoreOutSetUp } from "@/store/modules/router";
import { NotFoundPageRouteSepPage } from ".";
export function regRouterGuide(router: Router) {
  if (!router) return;
  router.beforeEach(async (to, from, next) => {
    // nProgress.start();
    window.$loadingBar.start();
    const userStore = useUserStoreOutSetUp();
    const token = userStore.getStoredToken();
    if (token) {
      //去的是登录页
      if (to.path && to.path === config.app.PAGE_LOGIN_PATH) {
        next({
          replace: true,
          name: config.app.PAGE_HOME_NAME,
        });
        window.$loadingBar.finish();
      } else {
        const perms = userStore.getPermissions;
        const hasPermissions = perms && perms.length;
        if (hasPermissions) {
          console.log(`已加载了用户权限直接跳转. 用户 perms: ${perms}`);
          next();
        } else {
          try {
            const userInfo = await userStore.getUserInfo(userStore.getToken);
            console.log("从后台获取到的用户权限:", userInfo);
            //重新创建路由
            let allRoutes = [];
            const routeStore = useRouterStoreOutSetUp();
            if (getAppConfig().VITE_SERVER_ROUTE === true) {
              const parseRoutes = await routeStore.setServerRoutes();
              console.log("服务端路由", parseRoutes);
              allRoutes = [...parseRoutes];
            } else {
              allRoutes = routeStore.setClientRoutes(userInfo.permissions);
              console.log("前端路由", allRoutes);
            }
            console.log("前端路由", allRoutes);
            console.error("所有路由", allRoutes);
            //产生菜单
            allRoutes.forEach((element: RouteRecordRaw) => {
              router.addRoute(element.name as string, element);
            });
            //404页面 单独页面
            router.addRoute(NotFoundPageRouteSepPage);
            next({ ...to, replace: true, query: to.query });
          } catch (error) {
            console.error("路由守卫出现异常:", error);
            window.$loadingBar.error();
          }
        }
      }
    } else {
      if (config.app.WHITE_LIST.indexOf(to.path) !== -1) {
        next();
        window.$loadingBar.finish();
      } else {
        if (getAppConfig().VITE_RECORD_LAST_ROUTE) {
          next(`${config.app.PAGE_LOGIN_PATH}?redirect=${to.path}`);
        } else {
          next(config.app.PAGE_LOGIN_PATH);
        }
        window.$loadingBar.finish();
      }
    }
  });
  router.afterEach((to) => {
    window.$loadingBar.finish();
    const name = to.name as string;
    const { t } = i18n.global as any;
    const trans = t("route." + name);
    const appName = getAppConfig().VITE_APP_NAME;
    useTitle((trans || (to.name as string)) + "| " + appName);
  });
  router.onError((error, to, from) => {
    window.$loadingBar.finish();
    window.$notify.error({
      closable: true,
      duration: 60000,
      title: error.name || "Error",
      content: `打开页面 [${to.fullPath}] 出现错误.原因: ${error.message}`,
    });
    console.error("加载路由错误:", error, to, from);
  });
}
