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
// 包裹一层，方便后续切换，没啥其他意思。。。
import GIconifyIcon from "@/components/GIcon/GIconifyIcon.vue";
import GIcon from "@/components/GIcon/GIconifyIcon.vue";
/**
 * 渲染 iconify 图标
 * @param name 图标名字，比如:fa-solid:sun
 * @param color 颜色，如:#000000
 * @param size 图标大小，数字:24或者 px 单位:24px
 * @param spin 旋转?
 * @returns
 */
export const renderIconifyIcon = (name: string, color?: string, size?: number | number, spin?: boolean) => {
  return h(GIconifyIcon, { icon: name, color: color, size: size, spin: spin }, { default: () => "" });
};
export { GIcon };
