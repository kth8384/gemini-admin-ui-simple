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
    path: "/pet",
    component: MainLayout,
    name: "Pet",
    meta: {
      hidden: false,
      icon: "fa-solid:crow",
    },
    children: [
      {
        path: "cat",
        meta: {
          icon: "fa-solid:cat",
          transition: "zoom-fade",
        },
        name: "PetCat",
        component: () => import("@/views/pet/cat/index.vue"),
      },
      {
        path: "dog",
        meta: {
          icon: "fa-solid:dog",
          transition: "zoom-fade",
        },
        name: "PetDog",
        component: () => import("@/views/pet/Dog.vue"),
      },
    ],
  },
];
