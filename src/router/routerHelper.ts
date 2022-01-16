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

import { RouteRecordRaw } from "vue-router";
//主要模板
const MainLayout = () => import("@/layouts/MainLayout.vue");
//空模板
const EmptyLayout = () => import("@/layouts/EmptyLayout.vue");
//iframe 内嵌页面
const IFrameLayout = () => import("@/views/base/iframe/index.vue");
const LayoutMap = new Map<string, () => Promise<typeof import("*.vue")>>();
LayoutMap.set("MAINLAYOUT", MainLayout);
LayoutMap.set("EMPTYLAYOUT", EmptyLayout);
LayoutMap.set("IFRAMELAYOUT", IFrameLayout);
export function getServerRoutes(routes: any[]): any[] {
  if (!routes) return [];
  const modules = import.meta.glob("../views/**/*.{vue,tsx}");
  return routes.map((route) => {
    if (!route.component && route.meta?.frameSrc) {
      route.component = "IFRAMELAYOUT";
    }
    const { component, name } = route;
    const { children } = route;
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase());
      if (layoutFound) {
        //模板
        route.component = layoutFound;
      } else {
        //页面
        route.component = dynamicImport(modules, component);
      }
      //转换一下服务端数据
      route = serverDataTransformer(route);
    } else if (name) {
      route.component = () =>
        new Promise((resolve) => {
          resolve({
            name: "MainLayout",
          });
        });
    }
    //如果有子节点，递归处理
    if (children && children.length) route.children = getServerRoutes(children);
    return route;
  });
}
export function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace("../views", "");
    const startFlag = component.startsWith("/");
    const endFlag = component.endsWith(".vue") || component.endsWith(".tsx");
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf(".");
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    console.error(
      "Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder."
    );
    return;
  } else {
    const msg =
      "页面加载失败\n在src/views/下找不到`" + component + ".vue` 或 " + component + ".tsx 文件, 请确认!";
    console.error(msg);
    return;
  }
}
function serverDataTransformer(route: any) {
  route.meta = {
    hidden: route.hidden, //是否左侧菜单里面隐藏，看下面：filterMenuRoutes
    icon: route.icon,
    affix: route.affix, //是否一直显示不可以关闭
    keepAlive: route.keepAlive, //keep alive
    transition: route.transition, //transition
    badge: route.badge, //角标
    badgeColor: route.badgeColor, //角标 颜色
    frameSrc: route.frameSrc, //外链地址 src
    target: route.target, //外链打开方式_blank 是新页打开，其他本页内嵌
    description: route.description, // 页面描述
  };
  //免得跟 menu 的配置参数:icon 冲突
  delete route["icon"];
  return route;
}
export function getClientRoutes() {
  ///这个方式，顺序是个问题，写一个文件里，顺序可以保证
  const modules = import.meta.globEager("../router/modules/**/*.ts");
  const routesItems: RouteRecordRaw[] = [];
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routesItems.push(...modList);
  });
  console.log("本地路由", routesItems);
  return routesItems;
}
export function filterMenuRoutes(routes: any[]) {
  const finallyRoutes: any[] = [];
  routes.forEach((route: any) => {
    let item = { ...route };
    if (item.meta?.hidden !== true) {
      if (item.children && item.children.length) {
        //只有一个下属路由，就不展开目录了
        if (item.children.length === 1) {
          item = item.children[0];
        } else {
          item.children = filterMenuRoutes(item.children);
        }
      } else {
        //以防万一，没下级就把 children 删掉，否则 tree 组件会渲染一个假装有下级的节点出来.
        delete item["children"];
      }
      finallyRoutes.push(item);
    }
  });
  return finallyRoutes;
}
export function hasPermission(permissions: any[], route: { meta: { permissions: string | any[] } }): boolean {
  //根据meta属性进行判断
  if (route.meta && route.meta.permissions && route.meta.permissions.length) {
    return permissions.some((perms: any) => {
      return route.meta.permissions.includes("*") || route.meta.permissions.includes(perms);
    });
  } else {
    return true;
  }
}
export function filterClientRoutesWithPermissions(routes: any[], permissions: string[]): any[] {
  const finallyRoutes: any[] = [];
  permissions &&
    permissions.length &&
    routes.forEach((route: any) => {
      const item = { ...route };
      if (hasPermission(permissions, route)) {
        if (item.children) {
          item.children = filterClientRoutesWithPermissions(item.children, permissions);
        }
        finallyRoutes.push(item);
      }
    });
  return finallyRoutes;
}
export function filterAffixTabs(routes: any[]) {
  const finallyRoutes: any[] = [];
  routes.forEach((route: any) => {
    const item = { ...route };
    if (item.meta && item.meta.affix === true) {
      if (item.children) {
        item.children = filterAffixTabs(item.children);
      }
      finallyRoutes.push(item);
    }
  });
  return finallyRoutes;
}
