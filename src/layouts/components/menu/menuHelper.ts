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

import { NBadge, NEllipsis } from "naive-ui";
import lang from "@/locales";
import { GIcon } from "@/components/GIcon";

//渲染菜单图标
export const renderMenuIcon = (route: any) => {
  return h(GIcon, { icon: route.meta?.icon }, { default: () => "" });
};

//渲染菜单文字
export const renderMenuLabel = (route: any) => {
  const key = "route." + route.name;
  const { t } = lang.global as any;
  const trasLabel = t(key as string);
  const label = trasLabel ? trasLabel : route.name;
  return h(NEllipsis, { tooltip: false }, { default: () => label });
};
//渲染菜单后面内容，比如:角标
export const renderMenuExtra = (route: any) => {
  if (route && route.meta && route.meta.badge) {
    const bde = route.meta.badge;
    if (bde) {
      const isDot: boolean = bde.toLocaleLowerCase() === "dot";
      return h(
        NBadge,
        {
          dot: isDot,
          value: isDot ? "" : bde,
          color: route.meta.badgeColor || "red",
        },
        { default: null }
      );
    }
  }
  return null;
};
