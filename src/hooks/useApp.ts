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

import { getThemeConfig } from "@/config";
import { useSettingsStore } from "@/store/modules/settings";

export function useApp() {
  const settings = useSettingsStore();
  const theme = getThemeConfig();
  /**
   * 获取 Content 内容区域高度差值，css 中通过 calc(100vh -这个值 )得到内容区域实际高度
   */
  function getContentHeightDValue() {
    return computed(() => {
      if (settings.showTabsBar) {
        if (settings.showFooter) {
          return (
            parseInt(theme.headerHeight) + parseInt(theme.tabHeight) + parseInt(theme.footerHeight) + "px"
          );
        } else {
          return parseInt(theme.headerHeight) + parseInt(theme.tabHeight) + "px";
        }
      }
      return theme.headerHeight;
    });
  }
  /**
   *获取 Content 内容区域高度,单位：px
   */
  function getContentHeight() {
    return computed(() => {
      const total = vhToPixels(100);
      return parseInt(total) - parseInt(getContentHeightDValue().value) + "px";
    });
  }
  /**
   * vh 单位转 px 单位
   * @param vh  比如:100,50,
   * @returns 返回 px 值
   */
  function vhToPixels(vh: number) {
    return Math.round(window.innerHeight / (100 / vh)) + "px";
  }

  return { getContentHeightDValue, vhToPixels, getContentHeight, getThemeConfig };
}
