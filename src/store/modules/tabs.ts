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
import { TabsStateType } from "typings/store";
import config from "@/config";
export const useTabsStore = defineStore({
  id: "tabs",
  state: (): TabsStateType => ({ tabs: [] }),
  getters: {
    getTabs(): any[] {
      return this.tabs;
    },
  },
  actions: {
    setTabs(tabs: any[]) {
      this.tabs = tabs;
    },
    addTab(route: any) {
      if (
        config.app.TAB_IGNORED_ROUTE_NAMES.length &&
        config.app.TAB_IGNORED_ROUTE_NAMES.includes(route.name)
      )
        return false;
      const isExists =
        this.tabs && this.tabs.length && this.tabs.some((item: { path: any }) => item.path == route.path);
      if (!isExists) {
        this.tabs.push(route);
      }
      return this.tabs;
    },
    //关闭其他
    closeOtherTabs(route: { path: any }) {
      this.tabs = this.tabs.filter((item) => item.path == route.path || (item.meta && item.meta.affix));
    },
    //关闭当前
    closeCurrentTabs(route: { path: any }) {
      const index = this.tabs.findIndex((item) => item.path == route.path);
      this.tabs.splice(index, 1);
    },
    closeAllTabs() {
      // 关闭全部
      this.tabs = this.tabs.filter((item) => item.meta && item.meta.affix);
      console.log("全部清除", this.tabs);
    },
  },
});
export function useTabsStoreOutSetUp() {
  return useTabsStore(store);
}
