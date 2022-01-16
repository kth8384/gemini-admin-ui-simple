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

import { useSettingsStoreOutSetUp } from "@/store/modules/settings";
import {
  darkTheme,
  zhCN,
  enUS,
  dateZhCN,
  dateEnUS,
  useMessage,
  useNotification,
  useThemeVars,
} from "naive-ui";
import { computed } from "vue";
import { brightenColor } from "@/utils/colorUtil";
const settings = useSettingsStoreOutSetUp();
export function useNaive() {
  function regMessagePlugin() {
    window.$message = useMessage();
  }
  /**
   * 把 Notification 组件注册到 window上，全局使用
   */
  function regNotificationPlugin() {
    window.$notify = useNotification();
  }
  const getNaiveLocale = computed(() => {
    const lang = settings.getLang;
    switch (lang) {
      case "zh-CN":
        return zhCN;
      default:
        return enUS;
    }
  });
  // //日期插件语系
  const getNaiveDateLocale = computed(() => {
    const lang = settings.getLang;
    switch (lang) {
      case "zh-CN":
        return dateZhCN;
      default:
        return dateEnUS;
    }
  });
  //naive 主题颜色覆盖
  const getNaiveThemeOverrides = computed(() => {
    const primaryColor = settings.getPrimaryColor;
    const infoColor = settings.getInfoColor;
    const successColor = settings.getSuccessColor;
    const warningColor = settings.getWarningColor;
    const errorColor = settings.getErrorColor;
    const deep = 1;
    const lightenPrimaryColor = brightenColor(primaryColor, deep);
    const lightenInfoColor = brightenColor(infoColor, deep);
    const lightenSuccessColor = brightenColor(successColor, deep);
    const lightenWarningColor = brightenColor(warningColor, deep);
    const lightenErrorColor = brightenColor(errorColor, deep);
    const overrides: any = {
      common: {
        primaryColor: primaryColor,
        primaryColorSuppl: lightenPrimaryColor,
        primarySuppl: lightenPrimaryColor,
        primaryActive: lightenPrimaryColor,
        primaryColorHover: lightenPrimaryColor,
        primaryColorPressed: lightenPrimaryColor,
        infoColor: infoColor,
        infoColorHover: lightenInfoColor,
        infoColorPressed: lightenInfoColor,
        infoColorSuppl: lightenInfoColor,
        successColor: successColor,
        successColorHover: lightenSuccessColor,
        successColorPressed: lightenSuccessColor,
        successColorSuppl: lightenSuccessColor,
        warningColor: warningColor,
        warningColorHover: lightenWarningColor,
        warningColorPressed: lightenWarningColor,
        warningColorSuppl: lightenWarningColor,
        errorColor: errorColor,
        errorColorHover: lightenErrorColor,
        errorColorPressed: lightenErrorColor,
        errorColorSuppl: lightenErrorColor,
      },
      Layout: {},
      Card: {},
    };
    //黑暗主题
    if (getNaiveDarkTheme.value) {
      overrides.common = {
        primaryColor: lightenPrimaryColor,
        primaryColorSuppl: lightenPrimaryColor,
        infoColor: lightenInfoColor,
        infoColorSuppl: lightenInfoColor,
        successColor: lightenSuccessColor,
        successColorSuppl: lightenSuccessColor,
        warningColor: lightenWarningColor,
        warningColorSuppl: lightenWarningColor,
        errorColor: lightenErrorColor,
        errorColorSuppl: lightenErrorColor,
      };
      overrides.Card.borderColor = "#000";
      return overrides;
    } else {
      //全局 layout 背景色设置一下，不那么白
      overrides.common.bodyColor = "rgb(239, 239, 245)";
      overrides.Card.borderColor = "#fff";
      // overrides.Layout.color = 'rgb(239, 239, 245)'
      return overrides;
    }
  });
  //naive 深色主题
  const getNaiveDarkTheme = computed(() => (settings.getDarkTheme ? darkTheme : undefined));

  return {
    regMessagePlugin,
    regNotificationPlugin,
    getNaiveDarkTheme,
    getNaiveDateLocale,
    getNaiveLocale,
    getNaiveThemeOverrides,
    themeVars: useThemeVars().value,
  };
}

// declare const derived: {
//   baseColor: string
//   primaryColor: string
//   primaryColorHover: string
//   primaryColorPressed: string
//   primaryColorSuppl: string
//   infoColor: string
//   infoColorHover: string
//   infoColorPressed: string
//   infoColorSuppl: string
//   successColor: string
//   successColorHover: string
//   successColorPressed: string
//   successColorSuppl: string
//   warningColor: string
//   warningColorHover: string
//   warningColorPressed: string
//   warningColorSuppl: string
//   errorColor: string
//   errorColorHover: string
//   errorColorPressed: string
//   errorColorSuppl: string
//   textColorBase: string
//   textColor1: string
//   textColor2: string
//   textColor3: string
//   textColorDisabled: string
//   placeholderColor: string
//   placeholderColorDisabled: string
//   iconColor: string
//   iconColorHover: string
//   iconColorPressed: string
//   iconColorDisabled: string
//   opacity1: string
//   opacity2: string
//   opacity3: string
//   opacity4: string
//   opacity5: string
//   dividerColor: string
//   borderColor: string
//   closeColor: string
//   closeColorHover: string
//   closeColorPressed: string
//   closeColorDisabled: string
//   clearColor: string
//   clearColorHover: string
//   clearColorPressed: string
//   scrollbarColor: string
//   scrollbarColorHover: string
//   scrollbarWidth: string
//   scrollbarHeight: string
//   scrollbarBorderRadius: string
//   progressRailColor: string
//   railColor: string
//   popoverColor: string
//   tableColor: string
//   cardColor: string
//   modalColor: string
//   bodyColor: string
//   tagColor: string
//   avatarColor: string
//   invertedColor: string
//   inputColor: string
//   codeColor: string
//   tabColor: string
//   actionColor: string
//   tableHeaderColor: string
//   hoverColor: string
//   tableColorHover: string
//   pressedColor: string
//   opacityDisabled: string
//   inputColorDisabled: string
//   boxShadow1: string
//   boxShadow2: string
//   boxShadow3: string
//   fontFamily: string
//   fontFamilyMono: string
//   fontWeight: string
//   fontWeightStrong: string
//   cubicBezierEaseInOut: string
//   cubicBezierEaseOut: string
//   cubicBezierEaseIn: string
//   borderRadius: string
//   borderRadiusSmall: string
//   fontSize: string
//   fontSizeTiny: string
//   fontSizeSmall: string
//   fontSizeMedium: string
//   fontSizeLarge: string
//   fontSizeHuge: string
//   lineHeight: string
//   heightTiny: string
//   heightSmall: string
//   heightMedium: string
//   heightLarge: string
//   heightHuge: string
//   transformDebounceScale: string
//   name: 'common'
// }
