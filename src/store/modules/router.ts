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

import { defineStore } from "pinia";
import { store } from "@/store";
import { RouterStateType } from "typings/store";
import {
  filterClientRoutesWithPermissions,
  filterMenuRoutes,
  getClientRoutes,
  getServerRoutes,
} from "@/router/routerHelper";
import { getMenus } from "@/api/BaseApi";
export const useRouterStore = defineStore({
  id: "router",
  state: (): RouterStateType => ({ routes: [], menus: [] }),
  getters: {
    getRoutes(): any[] {
      return this.routes;
    },
    getMenus(): any[] {
      return this.menus;
    },
  },
  actions: {
    async setServerRoutes() {
      const data = await getMenus();
      const menus = data || [];
      const accessRoutes: any[] = getServerRoutes(menus);
      this.routes = accessRoutes;
      this.menus = filterMenuRoutes(accessRoutes);
      console.error("Store: setServerRoutes 存储左侧菜单", this.menus);
      return accessRoutes;
    },
    setClientRoutes(perms: string[]) {
      console.log("设置前端路由,权限==", perms);
      const filterRoutes = filterClientRoutesWithPermissions(getClientRoutes(), perms);
      this.routes = filterRoutes;
      this.menus = filterMenuRoutes(filterRoutes);
      console.log("Store: setClientRoutes 存储左侧菜单", this.menus);
      return filterRoutes;
    },
  },
});
export function useRouterStoreOutSetUp() {
  return useRouterStore(store);
}
