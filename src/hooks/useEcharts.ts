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

import type { EChartsOption } from "echarts";
import type { Ref } from "vue";
import { computed, nextTick, ref, unref, watch } from "vue";
import { tryOnUnmounted, useEventListener, useTimeoutFn } from "@vueuse/core";
//按需引入组件
// import echarts from "./echartsComponents";
//全部引入
import * as echarts from "echarts";
import "echarts-wordcloud";
import { useSettingsStore } from "@/store/modules/settings";
import Events from "@/enum/eventEnum";
import { isEmpty } from "lodash";
// import lightTheme from '@/assets/themes/shine.json';
// import lightTheme from "@/assets/themes/macarons.json";
// import lightTheme from "@/assets/themes/walden.json";
// import lightTheme from "@/assets/themes/luter.json";
// import lightTheme from "@/assets/themes/wonderland.json";
// import lightTheme from "@/assets/themes/westeros.json";
// import darkTheme from "@/assets/themes/dark.json";
// import darkTheme from "@/assets/themes/chalk.json";
// echarts.registerTheme("light", lightTheme);
// echarts.registerTheme("dark", darkTheme);
//也可以去页面先引入后 use
export function useECharts(elRef: Ref<HTMLDivElement>, theme: "light" | "dark" | "default" = "default") {
  const settings = useSettingsStore();
  const getDarkTheme = computed(() => {
    return theme === "default" ? (settings.getDarkTheme ? "dark" : "light") : theme;
  });
  let chartInstance: echarts.ECharts | null = null;
  const chartsOptions = ref({}) as Ref<EChartsOption>;
  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    console.log("initCharts,当前语系:", settings.lang, settings.lang === "zh-CN" ? "ZH" : "EN");
    chartInstance = echarts.init(el, t, { locale: settings.lang === "zh-CN" ? "ZH" : "EN" });
    useEventListener(window, "resize", resize);
  }
  const getOptions = computed(() => {
    if (getDarkTheme.value !== "dark") {
      return chartsOptions.value as EChartsOption;
    }
    return {
      backgroundColor: "transparent",
      ...chartsOptions.value,
    } as EChartsOption;
  });

  function setOptions(options: any, clear = true) {
    if (!options || isEmpty(options)) {
      chartsOptions.value = emptyChartOption();
    } else {
      chartsOptions.value = options;
    }
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 300);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getDarkTheme.value as "default");
          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();
        chartInstance?.setOption(unref(getOptions));
      }, 300);
    });
  }
  function resize() {
    useTimeoutFn(() => {
      chartInstance?.resize();
    }, 300);
  }
  watch(
    () => getDarkTheme.value,
    (theme) => {
      if (chartInstance) {
        console.log("echart 主题切换", theme);
        chartInstance.dispose();
        initCharts(theme as "default");
        setOptions(chartsOptions.value);
      }
    }
  );

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkTheme.value as "default");
    }
    return chartInstance;
  }
  tryOnMounted(() => {
    console.log("echarts 初始化", getDarkTheme.value);
    window.$bus.on(Events.toggleFullScreen, (isFullScreen: boolean) => {
      console.log("echarts 全屏切换", unref(isFullScreen));
      resize();
    });
    window.$bus.on(Events.siderCollapsed, (value: boolean) => {
      console.log("echarts 侧边折叠", unref(value));
      nextTick(() => {
        resize();
      });
    });
  });

  tryOnBeforeUnmount(() => {
    console.log("echarts 解除事件监听");
    window.$bus.off(Events.toggleFullScreen);
    window.$bus.off(Events.siderCollapsed);
  });

  tryOnUnmounted(() => {
    console.log("卸载 echarts", chartInstance);
    if (!chartInstance) return;
    chartInstance.dispose();
    chartInstance = null;
  });
  /**
   * 
   * @param subtext 子标题
   * if (!chartData || chartData.length === 0) {
    setOptions(emptyChartOption('暂无数据'));
    return;
  }
   * @returns 
   */
  function emptyChartOption(subtext = "暂无图表数据,请修改查询条件后再试") {
    console.log("echarts 设置空图表");
    return {
      title: {
        text: "{a|}",
        x: "center",
        y: "10%",
        subtext,
        itemGap: 20,
        textStyle: {
          rich: {
            a: {
              height: 100,
              width: 160,
              backgroundColor: {
                image:
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbFJ1bGU9ImV2ZW5vZGQiPg0KICAgIDxlbGxpcHNlIGZpbGw9IiNkZGQiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3IiAvPg0KICAgIDxnIGZpbGxSdWxlPSJub256ZXJvIiBzdHJva2U9IiM5OTkiPg0KICAgICAgPHBhdGgNCiAgICAgICAgZD0iTTU1IDEyLjc2TDQ0Ljg1NCAxLjI1OEM0NC4zNjcuNDc0IDQzLjY1NiAwIDQyLjkwNyAwSDIxLjA5M2MtLjc0OSAwLTEuNDYuNDc0LTEuOTQ3IDEuMjU3TDkgMTIuNzYxVjIyaDQ2di05LjI0eiIgLz4NCiAgICAgIDxwYXRoDQogICAgICAgIGQ9Ik00MS42MTMgMTUuOTMxYzAtMS42MDUuOTk0LTIuOTMgMi4yMjctMi45MzFINTV2MTguMTM3QzU1IDMzLjI2IDUzLjY4IDM1IDUyLjA1IDM1aC00MC4xQzEwLjMyIDM1IDkgMzMuMjU5IDkgMzEuMTM3VjEzaDExLjE2YzEuMjMzIDAgMi4yMjcgMS4zMjMgMi4yMjcgMi45Mjh2LjAyMmMwIDEuNjA1IDEuMDA1IDIuOTAxIDIuMjM3IDIuOTAxaDE0Ljc1MmMxLjIzMiAwIDIuMjM3LTEuMzA4IDIuMjM3LTIuOTEzdi0uMDA3eiINCiAgICAgICAgZmlsbD0iI2UxZTFlMSIgLz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg==",
              },
            },
          },
        },
        subtextStyle: {
          fontSize: 16,
        },
      },
    };
  }
  return {
    setOptions,
    resize,
    echarts,
    getInstance,
    emptyChartOption,
  };
}
