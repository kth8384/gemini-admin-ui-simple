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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { App, unref, Plugin } from "vue";
import { RouteLocationNormalized, RouteRecordNormalized } from "vue-router";

export function openWindow(
  url: string,
  opt?: {
    target?: TargetContext | string;
    noopener?: boolean;
    noreferrer?: boolean;
  }
) {
  const { target = "__blank", noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");

  window.open(url, target, feature.join(","));
}
/**
 * @description m到n的随机数
 * @param m
 * @param n
 * @returns {number}
 */
export function randomNumbers(m: number, n: number): number {
  return Math.floor(Math.random() * (m - n) + n);
}

/**
 * 高亮显示文本,eg:<span  v-html="highLightText(this.search,row.username)"></span>
 * @param searchText 高亮的文字，一般就是搜索的文字
 * @param value  原值,也就是在哪里匹配searchText
 * @param minLength 搜索字符大于几个，才开始进行高亮匹配，默认:0
 * @return {string} 如果匹配上，返回高亮html片段，如果不匹配，返回原值
 */
export function highLightText(searchText = "", value = "", minLength = 0): string {
  value = value + "";
  if (value.indexOf(searchText) !== -1 && searchText !== "" && searchText.length > minLength) {
    return value.replace(searchText, '<b  style="color: red;font-weight: 900">' + searchText + "</b>");
  } else {
    return value;
  }
}
/**
 * 数组乱序
 * @param array
 * @returns
 */
export function shuffle(array: any[]) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
/**
 * 随机插入
 * @param arr1
 * @param arr2
 * @returns
 */
export function randomInsert(toInserts: any[], dest: any[]) {
  toInserts.forEach((value) => dest.splice(Math.random() * dest.length, 0, value));
  return dest;
}
export function uniquePush(array: any[], item: any) {
  for (let i = 0; i < array.length; i++) {
    if (array.indexOf(item) == -1) {
      array.push(item);
    }
  }
}
export function uniqueArray(array: any[]) {
  const map = new Map();
  array.forEach((a) => map.set(a, (map.get(a) || 0) + 1));
  return array.filter((a) => map.get(a) > 1);
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object");
}
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    console.error("注册全局插件", comp);
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};
export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}
// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};
  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });
  return ret as Partial<U>;
}
export function randomStringId() {
  const $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const maxPos = $chars.length;
  let id = "";
  for (let i = 0; i < 16; i++) {
    id += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return id;
}
