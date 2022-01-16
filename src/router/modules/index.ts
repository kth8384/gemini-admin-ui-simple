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
    path: "/",
    component: MainLayout,
    redirect: { name: "Home" },
    name: "Index",
    meta: {
      icon: "fa-solid:home",
    },
    children: [
      {
        path: "home",
        meta: {
          icon: "fa-solid:home",
          transition: "fade-slide",
          affix: true,
        },
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  //这些都在目录里隐藏
  {
    path: "/uc",
    component: MainLayout,
    name: "UserCenter",
    meta: {
      icon: "fa-solid:id-card",
      hidden: true,
    },
    children: [
      {
        path: "/uc/profile",
        name: "UserProfile",
        meta: {
          icon: "fa-solid:id-card",
          transition: "zoom-fade",
          hidden: true,
        },
        component: () => import("@/views/base/profile/index.vue"),
      },
    ],
  },
];
