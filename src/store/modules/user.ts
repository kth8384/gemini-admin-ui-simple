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
import { UpcLoginParamType, UserStateType } from "typings/store";
import storage from "@/utils/storage";
import { getCurrentUserInfo, login, logout } from "@/api/BaseApi";
import CryptoJS from "crypto-js";
import config from "@/config";
import { resetRouter } from "@/router";
export function getLsBase64JsonValue(key: string, fieldName: string, defaultValue: any) {
  const jsonObj = storage.getJsonBase64(key);
  if (typeof jsonObj === "undefined" || null === jsonObj) {
    return null;
  }
  const value = jsonObj[fieldName];
  return typeof jsonObj === "undefined" ? defaultValue : value;
}
const storageTokenName = config.storage.TokenNameKey;
export const useUserStore = defineStore({
  id: "user",
  state: (): UserStateType => ({
    status: {
      token: getLsBase64JsonValue(storageTokenName, "token", ""),
      password: getLsBase64JsonValue(storageTokenName, "password", ""),
      locked: getLsBase64JsonValue(storageTokenName, "locked", false),
    },
    user: {},
    permissions: [],
  }),
  getters: {
    getToken(): string {
      return this.status.token;
    },
    getLocked(): boolean {
      return this.status.locked;
    },
    getPassword(): string {
      return this.status.password;
    },
    getUser(): any {
      return this.user;
    },
    getPermissions(): string[] {
      return this.permissions;
    },
  },
  actions: {
    /**
     * 从 LocalStorage 获取 token，主要用在路由进入前的判断
     * @returns
     */
    getStoredToken() {
      const token = getLsBase64JsonValue(storageTokenName, "token", null);
      if (!token || !token.length) {
        this.status.token = "";
      }
      return token;
    },
    async login(loginParams: UpcLoginParamType): Promise<any> {
      try {
        const token = await login(loginParams);
        console.log("登录", token);
        if (!token) {
          return Promise.reject({ msg: "用户名或者密码错误:token" });
        }
        //mock 的时候 httpstatus =200 但是 code = 401 用来测试错误情况
        //实际上，如果登录失败，后台会直接返回 httpstatus = 401
        if (token && token.code && token.code !== 200) {
          return Promise.reject({ msg: "用户名或者密码错误:status" });
        }
        this.setStatus(token, false);
        return token;
      } catch (error) {
        console.error("出错:", error);
        return Promise.reject(error);
      }
    },
    async getUserInfo(token?: string): Promise<any> {
      try {
        const data = await getCurrentUserInfo(token ? token : this.status.token);
        console.error("获取到用户", data);
        if (!data) {
          return Promise.reject({ msg: "获取用户信息失败:null" });
        }
        console.log("用户信息", data);
        this.setUser(data);
        //没权限就给个默认空的
        let perms = data.permissions;
        if (!perms || perms.length <= 0) {
          perms = ["NoAuth"];
        }
        this.setPermissions(perms);
        data.permissions = perms;
        return data;
      } catch (error) {
        console.error("出错:", error);
        return Promise.reject(error);
      }
    },
    async logout(token?: string) {
      await logout(token);
      this.clearStatus();
      this.clearPermission();
      resetRouter();
    },
    setToken(token: string): void {
      this.status.token = token;
      // storage.setBase64(storageTokenName, this.status);
    },
    setLocked(locked: boolean): void {
      this.status.locked = locked;
      storage.setBase64(storageTokenName, this.status);
    },
    setStatus(token: string, locked: boolean): void {
      this.status.token = token;
      this.status.locked = locked;
      storage.setBase64(storageTokenName, this.status);
    },
    clearStatus() {
      this.status.token = "";
      this.status.locked = false;
      storage.remove(storageTokenName);
    },
    clearPermission() {
      this.permissions = [];
    },
    setUser(user: any): void {
      this.user = user;
    },
    setPermissions(perms: string[]): void {
      this.permissions = perms;
    },
    lock(password: string): boolean {
      if (password && this.getToken) {
        this.status.locked = true;
        this.status.password = CryptoJS.MD5(password).toString();
        storage.setBase64(storageTokenName, this.status);
        return true;
      }
      console.error("空密码或者没登录，都不能锁屏");
      return false;
    },
    unlock(password: string): boolean {
      const cipherPass = this.getPassword;
      if (password && cipherPass && typeof cipherPass !== "undefined") {
        if (CryptoJS.MD5(password).toString() === cipherPass) {
          this.resetLock();
          return true;
        }
      }
      return false;
    },
    resetLock() {
      this.status.locked = false;
      this.status.password = "";
      storage.setBase64(storageTokenName, this.status);
    },
  },
});
export function useUserStoreOutSetUp() {
  return useUserStore(store);
}
