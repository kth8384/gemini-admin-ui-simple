<!--
  - /*
  -  *    Copyright 2020-2021 Luter.me
  -  *
  -  *    Licensed under the Apache License, Version 2.0 (the "License");
  -  *    you may not use this file except in compliance with the License.
  -  *    You may obtain a copy of the License at
  -  *
  -  *      http://www.apache.org/licenses/LICENSE-2.0
  -  *
  -  *    Unless required by applicable law or agreed to in writing, software
  -  *    distributed under the License is distributed on an "AS IS" BASIS,
  -  *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  *    See the License for the specific language governing permissions and
  -  *    limitations under the License.
  -  */
  -->

<!--  -->
<template>
  <n-grid :x-gap="10" :y-gap="5" :cols="2">
    <n-grid-item>
      <n-card size="medium">
        <div ref="chartRef" style="height: 400px; width: 100%; border: 1px solod #000"></div>
      </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card size="medium" />
    </n-grid-item>
  </n-grid>
</template>
<script setup lang="ts">
import * as echarts from 'echarts/core';
import theme from './dark';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  AriaComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { EChartsOption } from 'echarts';
import { tryOnUnmounted, useEventListener, useTimeoutFn } from '@vueuse/core';
import { useSettingsStore } from '@/store/modules/settings';
echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  AriaComponent,
  LegendComponent,
  CanvasRenderer
]);
const pieOption: EChartsOption = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0
        }
      }
    }
  ],
  aria: {
    enabled: true,
    decal: {
      show: true
    }
  }
};

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
const settingsStore = useSettingsStore();
/////////
const getChartTheme = computed(() => {
  return settingsStore.darkTheme ? 'veryDark' : 'light';
});
function initCharts() {
  const el: any = unref(chartRef);
  if (!el || !unref(el)) {
    return;
  }
  echarts.registerTheme('veryDark', theme);
  chartInstance = echarts.init(el, getChartTheme.value);
}
function setOptions(options: EChartsOption, clear = true) {
  nextTick(() => {
    useTimeoutFn(() => {
      if (!chartInstance) {
        initCharts();
        if (!chartInstance) return;
      }
      clear && chartInstance?.clear();
      chartInstance?.setOption(options);
    }, 50);
  });
}

watch(
  () => getChartTheme.value,
  (theme) => {
    if (chartInstance) {
      console.log('主题变了', theme);
      chartInstance.dispose();
      initCharts();
      if (chartInstance) {
        setOptions(pieOption);
      }
    }
  }
);
useEventListener(window, 'resize', () => {
  chartInstance?.resize();
});
onMounted(() => {
  console.log('DOM 挂载');
  initCharts();
  if (chartInstance) {
    setOptions(pieOption);
  }
});
tryOnUnmounted(() => {
  if (!chartInstance) return;
  console.log('DOM 卸载');
  chartInstance.dispose();
  chartInstance = null;
});
</script>
<style lang="scss" scoped></style>
