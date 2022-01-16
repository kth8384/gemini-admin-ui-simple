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

import { MockMethod } from "vite-plugin-mock";
import { allUser, allRoutes, messages } from "../../data/base";
import CryptoJS from "crypto-js";
import { responseError } from "../../mockUtli";
//123456的 md5 密文
const cipherPassword = "e10adc3949ba59abbe56e057f20f883e";
export default [
  {
    url: "/api/sys/auth/menus",
    method: "get",
    response: () => {
      return allRoutes;
    },
  },
  {
    url: "/api/sys/auth/login",
    method: "post",
    response({ body }: any) {
      const { username, password } = body;
      console.log("login-===>", username, password);

      if (username && password) {
        const index = allUser.findIndex((item) => item.username == username);
        const user = allUser[index];
        if (user) {
          if (cipherPassword === CryptoJS.MD5(password).toString()) {
            return user.token;
          }
        }
      }
      return responseError(401, "用户名或者密码错误");
    },
  },
  {
    url: "/api/sys/auth/current",
    method: "get",
    response: ({ query }: any) => {
      const { token } = query;
      const index = allUser.findIndex((item) => item.token == token);
      const user = allUser[index];
      if (!user) {
        return responseError(401, "请登录");
      }
      return user;
    },
  },
  {
    url: "/api/sys/auth/logout",
    method: "post",
    response: () => {
      ////啥也不返回了，请求成功就是注销成功了
    },
  },
  {
    url: "/api/sys/auth/messages/current",
    method: "get",
    response: ({ query }: any) => {
      const { token } = query;
      return messages;
    },
  },
] as MockMethod[];
