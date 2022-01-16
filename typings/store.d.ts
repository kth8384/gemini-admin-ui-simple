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

export interface RouterStateType {
  routes: any[];
  menus: any[];
}
//用户 state
export interface UserStateType {
  status: TokenStateType;
  user: any;
  permissions: string[];
}
//登录参数用户名密码验证码
export interface UpcLoginParamType {
  username: string;
  password: string;
  captcha?: string;
}
export interface SettingStateType {
  layout: "vertical" | "mixVertical" | string;
  darkTheme: boolean;
  darkHeader: boolean;
  darkSider: boolean;
  siderCollapsed: boolean;
  lang: string;
  darkFooter: boolean;
  primaryColor: string;
  infoColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  showBanner: boolean;
  showFooter: boolean;
  showBreadCrumb: boolean;
  showHeaderMessage: boolean;
  showTabsBar: boolean;
  animated: boolean;
  siderWidth: number;
  siderCollapsedWidth: number;
}
///标签页
export interface TabsStateType {
  tabs: RouteLocationNormalized[];
}
