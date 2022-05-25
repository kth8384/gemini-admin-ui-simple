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

import { SysMessages } from "./../../src/api/BaseApi";
//用户
const allUser = [
  {
    id: 1,
    username: "luter",
    nickname: "张无忌",
    slogan: "歌神的世界,精彩依旧~~~",
    tags: ["牛人", "吃货", "死胖子", "码畜"],
    //后台菜单，这个数组主要就是给前端权限指令用的,用指令控制是否显示隐藏界面元素
    permissions: ["user"],
    token: "123sd12312asdasd",
    avatar:
      "http://img14.360buyimg.com/n7/s186x186_jfs/t1/11650/7/6400/269440/5c3ecbfeE9b7d1737/04e71937efed86ea.jpg",
  },
  {
    id: 2,
    username: "admin",
    nickname: " 张三丰",
    token: "asdasdasasda123123",
    slogan: "彪悍的人生,需要钱",
    tags: ["牛人", "吃货", "死胖子", "码畜"],
    avatar:
      "http://img14.360buyimg.com/n7/s186x186_jfs/t1/11650/7/6400/269440/5c3ecbfeE9b7d1737/04e71937efed86ea.jpg",
    permissions: ["admin"],
  },
];
/////路由
const indexRoutes = [
  {
    path: "/",
    component: "MainLayout",
    redirect: { name: "Home" },
    name: "Index",
    icon: "fa-solid:dog",
    children: [
      {
        path: "home",
        icon: "fa-solid:dove",
        transition: "fade-slide",
        name: "Home",
        affix: true,
        component: "Home",
      },
    ],
  },
];
const hiddenRoutes = [
  {
    path: "/uc",
    name: "UserCenter",
    component: "MainLayout",
    icon: "fa  fa-democrat",
    hidden: true,
    children: [
      {
        path: "profile",
        name: "UserProfile",
        component: "base/profile/index",
        hidden: true,
        transition: "fade-slide",
        icon: "fa  fa-democrat",
        badge: "新",
      },
    ],
  },
];
const compRoutes = [
  {
    path: "/lab",
    component: "MainLayout",
    name: "Lab",
    icon: "fa-solid:dog",
    children: [
      {
        path: "lab1",
        icon: "fa-solid:dove",
        transition: "fade-slide",
        name: "Lab1",
        component: "lab/Lab",
      },
      {
        path: "keepalive",
        icon: "fa-solid:dove",
        transition: "fade-slide",
        name: "KeepAliveDemo",
        component: "lab/KeepAlive",
        keepAlive: true,
      },
      {
        path: "settings",
        icon: "fa-solid:dove",
        transition: "fade-slide",
        name: "Settings",
        component: "lab/Settings",
      },
      {
        path: "icons",
        icon: "fa-solid:dove",
        transition: "fade-slide",
        name: "Icons",
        component: "lab/Icon",
      },
    ],
  },
];
const petRoutes = [
  {
    path: "/pet",
    component: "MainLayout",
    name: "Pet",
    icon: "fa-solid:dog",
    children: [
      {
        path: "cat",
        icon: "fa-solid:dove",
        transition: "fade-slide",
        name: "PetCat",
        component: "pet/cat/index",
      },
      {
        path: "dog",
        icon: "fa-solid:dove",
        transition: "fade-slide",
        name: "PetDog",
        component: "pet/Dog",
      },
    ],
  },
];
const iframeRoutes = [
  {
    path: "/iframe",
    component: "MainLayout",
    name: "IFrame",
    icon: "ic:baseline-self-improvement",
    children: [
      {
        path: "self",
        icon: "ic:baseline-self-improvement",
        transition: "fade-slide",
        component: "IFrameLayout",
        name: "IFrameSelf",
        frameSrc: "https://www.naiveui.com/zh-CN/os-theme",
      },
      {
        path: "blank",
        icon: "mdi:book-open-blank-variant",
        transition: "fade-slide",
        component: "IFrameLayout",
        name: "IFrameBlank",
        frameSrc: "https://www.naiveui.com/zh-CN/os-theme",
        target: "_blank",
      },
    ],
  },
];
const allRoutes = [...indexRoutes, ...hiddenRoutes, ...compRoutes, ...petRoutes, ...iframeRoutes];
////消息
const messages: SysMessages[] = [
  {
    title: "张三丰出关了",
    content: "张三丰出关了",
    timestamp: "2021-01-02 01:01:01",
    isRead: false,
  },
  {
    title: "六大派开始围攻光明顶",
    content: "六大派开始围攻光明顶",
    timestamp: "2021-02-02 01:01:01",
    isRead: true,
  },
];
export { allUser, allRoutes, messages };
