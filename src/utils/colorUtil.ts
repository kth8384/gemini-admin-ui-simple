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

import chroma from "chroma-js";

/**
 * 更亮的颜色
 * @param color - 颜色
 * @param deep - 效果层次
 */
export function brightenColor(color: string, deep: number = 0.5) {
  return chroma(color).brighten(deep).hex();
}

/**
 * 更暗的颜色
 * @param color - 颜色
 * @param deep - 效果层次
 */
export function darkenColor(color: string, deep: number = 0.5) {
  return chroma(color).darken(deep).hex();
}

/**
 * 给颜色加透明度
 * @param color - 颜色
 * @param alpha - 透明度
 */
export function addColorAlpha(color: string, alpha: number) {
  return chroma(color).alpha(alpha).hex();
}

/**
 * 颜色混合
 * @param firstColor - 第一个颜色
 * @param secondColor - 第二个颜色
 * @param ratio - 第二个颜色占比
 */
export function mixColor(firstColor: string, secondColor: string, ratio: number) {
  return chroma.mix(firstColor, secondColor, ratio).hex();
}
