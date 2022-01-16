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

import { getRequest, postRequest } from "@/utils/request";
export interface SysMenuModel {
  path: string;
  name: string;
  component: string;
  transition?: string;
  icon?: string;
  keepAlive?: boolean;
  description?: string;
  children?: SysMenuModel[];
}
export interface SysMessages {
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}
export function getCurrentUserInfo(token?: string) {
  return getRequest({
    url: "/sys/auth/current",
    params: { token: token || "" },
  });
}
export function login(data: any) {
  console.log("登录参数", data);
  return postRequest({
    url: "/sys/auth/login",
    data: data,
  });
}
export function logout(token?: string) {
  return postRequest({
    url: "/sys/auth/logout",
    data: { token: token },
  });
}
export function getMenus() {
  return getRequest<SysMenuModel[]>({ url: "/sys/auth/menus" });
}
export function getCurrentUserMessages() {
  return getRequest<SysMessages[]>({ url: "/sys/auth/messages/current" });
}
