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
import { SettingStateType } from "typings/store";
import storage from "@/utils/storage";
import config from "@/config";
import eventEnum from "@/enum/eventEnum";
const storageKey = config.storage.SettingKey;
export function getLocalStoragePram(key: string, defaultValue: any) {
  let jsonObj = storage.getJsonBase64(storageKey);
  if (typeof jsonObj === "undefined" || null === jsonObj) {
    jsonObj = initDefaultSettings();
  }
  const value = jsonObj[key];
  return typeof jsonObj === "undefined" ? defaultValue : value;
}
function initDefaultSettings(): SettingStateType {
  const defaultConfig: SettingStateType = {
    darkTheme: false,
    layout: "vertical",
    darkSider: true,
    darkHeader: false,
    siderCollapsed: false,
    lang: "en-US",
    darkFooter: false,
    showBanner: true,
    showFooter: false,
    showBreadCrumb: true,
    showHeaderMessage: true,
    showTabsBar: true,
    animated: true,
    siderWidth: 240,
    siderCollapsedWidth: 60,
    primaryColor: "#082bc9",
    infoColor: "#4FCDFB",
    successColor: "#09DD09",
    warningColor: "#FF9800",
    errorColor: "#FF0000",
  };
  const jsonObj = storage.getJsonBase64(storageKey);
  if (typeof jsonObj === "undefined" || null === jsonObj) {
    storage.setBase64(storageKey, defaultConfig);
    console.log("初始化系统风格设置", defaultConfig);
  }
  return defaultConfig;
}
export const useSettingsStore = defineStore({
  id: "settings",
  state: (): SettingStateType => ({
    layout: getLocalStoragePram("layout", false),
    darkTheme: getLocalStoragePram("darkTheme", false),
    darkHeader: getLocalStoragePram("darkHeader", false),
    darkSider: getLocalStoragePram("darkSider", false),
    siderCollapsed: getLocalStoragePram("siderCollapsed", false),
    lang: getLocalStoragePram("lang", "zh-CN"),
    darkFooter: getLocalStoragePram("darkFooter", false),
    primaryColor: getLocalStoragePram("primaryColor", "#082bc9"),
    infoColor: getLocalStoragePram("infoColor", "#4FCDFB"),
    successColor: getLocalStoragePram("successColor", "#09DD09"),
    warningColor: getLocalStoragePram("warningColor", "#FF9800"),
    errorColor: getLocalStoragePram("errorColor", "#FF0000"),
    showBanner: getLocalStoragePram("showBanner", true),
    showFooter: getLocalStoragePram("showFooter", false),
    showBreadCrumb: getLocalStoragePram("showBreadCrumb", true),
    showHeaderMessage: getLocalStoragePram("showHeaderMessage", true),
    showTabsBar: getLocalStoragePram("showTabsBar", true),
    animated: getLocalStoragePram("animated", true),
    siderWidth: getLocalStoragePram("siderWidth", 240),
    siderCollapsedWidth: getLocalStoragePram("siderCollapsedWidth", 60),
  }),
  getters: {
    getDarkSider(): boolean {
      return this.darkSider;
    },
    getDarkHeader(): boolean {
      return this.darkHeader;
    },
    getDarkFooter(): boolean {
      return this.darkFooter;
    },
    getDarkTheme(): boolean {
      return this.darkTheme;
    },
    getSiderCollapsed(): boolean {
      console.log("侧边栏", this.siderCollapsed);
      return this.siderCollapsed;
    },
    getLang(): string {
      return this.lang;
    },
    getLayout(): string {
      return this.layout;
    },
    getSiderCollapsedWidth(): number {
      return this.siderCollapsedWidth;
    },
    getShowBreadCrumb(): boolean {
      return this.showBreadCrumb;
    },
    getShowBanner(): boolean {
      return this.showBanner;
    },
    getShowFooter(): boolean {
      return this.showFooter;
    },
    getSiderWidth(): number {
      return this.siderWidth;
    },
    getPrimaryColor(): string {
      return this.primaryColor;
    },
    getInfoColor(): string {
      return this.infoColor;
    },
    getSuccessColor(): string {
      return this.successColor;
    },
    getWarningColor(): string {
      return this.warningColor;
    },
    getErrorColor(): string {
      return this.errorColor;
    },
    getShowHeaderMessage(): boolean {
      return this.showHeaderMessage;
    },
    getShowTabsBar(): boolean {
      return this.showTabsBar;
    },
    getAnimated(): boolean {
      return this.animated;
    },
    getSiderCollapedWidth(): number {
      return this.siderCollapsedWidth;
    },
  },
  actions: {
    setDarkSider(value: boolean): void {
      this.darkSider = value;
      storage.setBase64(storageKey, this.$state);
    },
    setDarkHeader(value: boolean): void {
      this.darkHeader = value;
      storage.setBase64(storageKey, this.$state);
    },
    setDarkFooter(value: boolean): void {
      this.darkFooter = value;
      storage.setBase64(storageKey, this.$state);
    },
    setDarkTheme(value: boolean): void {
      this.darkTheme = value;
      storage.setBase64(storageKey, this.$state);
    },
    setSiderCollapsed(value: boolean): void {
      console.log("侧边栏折叠", value);
      this.siderCollapsed = value;
      storage.setBase64(storageKey, this.$state);
      window.$bus.emit(eventEnum.siderCollapsed, value);
    },
    setShowBreadCrumb(value: boolean): void {
      this.showBreadCrumb = value;
      storage.setBase64(storageKey, this.$state);
    },
    setShowBanner(value: boolean): void {
      this.showBanner = value;
      storage.setBase64(storageKey, this.$state);
    },
    setShowFooter(value: boolean): void {
      this.showFooter = value;
      storage.setBase64(storageKey, this.$state);
    },
    setLang(value: string): void {
      this.lang = value;
      storage.setBase64(storageKey, this.$state);
    },
    setLayout(value: string): void {
      this.layout = value;
      storage.setBase64(storageKey, this.$state);
    },
    setSiderCollapsedWidth(value: number): void {
      this.siderCollapsedWidth = value;
      storage.setBase64(storageKey, this.$state);
    },
    setSiderWidth(value: number): void {
      this.siderWidth = value;
      storage.setBase64(storageKey, this.$state);
    },
    setPrimaryColor(value: string): void {
      this.primaryColor = value;
      storage.setBase64(storageKey, this.$state);
    },
    setInfoColor(value: string): void {
      this.infoColor = value;
      storage.setBase64(storageKey, this.$state);
    },
    setSuccessColor(value: string): void {
      this.successColor = value;
      storage.setBase64(storageKey, this.$state);
    },
    setWarningColor(value: string): void {
      this.warningColor = value;
      storage.setBase64(storageKey, this.$state);
    },
    setErrorColor(value: string): void {
      this.errorColor = value;
      storage.setBase64(storageKey, this.$state);
    },
    setShowHeaderMessage(value: boolean): void {
      this.showHeaderMessage = value;
      storage.setBase64(storageKey, this.$state);
    },
    setShowTabsBar(value: boolean): void {
      this.showTabsBar = value;
      storage.setBase64(storageKey, this.$state);
    },
    setAnimated(value: boolean): void {
      this.animated = value;
      storage.setBase64(storageKey, this.$state);
    },
    removeSettings(): void {
      storage.remove(storageKey);
    },
    resetSettings(): void {
      this.$state = initDefaultSettings();
      storage.setBase64(storageKey, this.$state);
    },
  },
});
export function useSettingsStoreOutSetUp() {
  return useSettingsStore(store);
}
