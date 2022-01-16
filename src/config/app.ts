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

//登录页
const PAGE_LOGIN_PATH = "/login";
//404错误页
const PAGE_404_PATH = "/404";
//重定向页面
const PAGE_REDIRECT_PATH = "/redirect";
export default {
  //get messages duration, unit : ms
  MESSAGES_REFRESH_DURATION: 10 * 1000,
  //白名单，这些路由不需要访问权限就能访问
  WHITE_LIST: [PAGE_LOGIN_PATH, PAGE_404_PATH, PAGE_REDIRECT_PATH],
  // route names that will be ignored by tabs
  TAB_IGNORED_ROUTE_NAMES: ["Redirect", "login", "NotFound"],
  PAGE_404_NAME: "NotFound",
  PAGE_LOCK_NAME: "Lock",
  PAGE_HOME_NAME: "Home",
  PAGE_HOME_PATH: "/home",
  PAGE_REDIRECT_PATH,
  PAGE_REDIRECT_NAME: "Redirect",
  PAGE_404_PATH,
  PAGE_LOGIN_PATH,
  PAGE_LOGIN_NAME: "Login",
};
