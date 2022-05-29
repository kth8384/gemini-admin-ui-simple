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

const MainLayout = () => import("@/layouts/MainLayout.vue");
export default [
  {
    path: "/lab",
    component: MainLayout,
    name: "Lab",
    meta: {
      icon: "fa-solid:flask",
    },
    children: [
      {
        path: "lab1",
        meta: {
          icon: "fa-solid:crow",
          transition: "zoom-fade",
          permissions: ["admin"],
        },
        name: "Lab1",
        component: () => import("@/views/lab/Lab.vue"),
      },
      {
        path: "keepalive",
        meta: {
          icon: "fa-solid:shield-virus",
          keepAlive: true,
          badge: "新",
          badgeColor: "#00ffdd",
        },
        name: "KeepAliveDemo",
        component: () => import("@/views/lab/KeepAlive.vue"),
      },
      {
        path: "settings",
        meta: {
          icon: "fa-solid:cogs",
          badge: "牛",
          badgeColor: "#ff0fff",
        },
        name: "Settings",
        component: () => import("@/views/lab/Settings.vue"),
      },
      {
        path: "icons",
        meta: {
          icon: "fa-solid:icons",
          badge: "牛",
          badgeColor: "#ff0000",
        },
        name: "Icons",
        component: () => import("@/views/lab/Icon.vue"),
      },
      {
        path: "perms",
        meta: {
          icon: "fa-solid:users",
        },
        name: "Perms",
        component: () => import("@/views/lab/Perm.vue"),
      },
      {
        path: "echarts",
        meta: {
          icon: "fa-solid:users",
        },
        name: "Echarts",
        component: () => import("@/views/lab/echarts.vue"),
      },
    ],
  },
];
