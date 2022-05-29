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
import { useSettingsStore } from "@/store/modules/settings";
//也可以去页面先引入后 use
export function useECharts(elRef: Ref<HTMLDivElement>, theme: "light" | "dark" | "default" = "default") {
  const settings = useSettingsStore();
  const getDarkTheme = computed(() => {
    console.error("获取主题", theme);
    return theme === "default" ? (settings.getDarkTheme ? "dark" : "light") : theme;
  });
  let chartInstance: echarts.ECharts | null = null;
  const chartsOptions = ref({}) as Ref<EChartsOption>;
  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstance = echarts.init(el, t);
    useEventListener(window, "resize", resize);
    useTimeoutFn(() => {
      resize();
    }, 100);
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
    chartsOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 100);
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
      }, 100);
    });
  }
  function resize() {
    console.log("echarts resize....");
    chartInstance?.resize();
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
  tryOnUnmounted(() => {
    console.log("卸载 echarts", chartInstance);
    if (!chartInstance) return;
    chartInstance.dispose();
    chartInstance = null;
  });
  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkTheme.value as "default");
    }
    return chartInstance;
  }
  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  };
}
