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

<template>
    <n-grid :cols="1">
        <n-grid-item>
            <div ref="chartsRef" :style="{ height: mapHeight }"></div>
        </n-grid-item>
    </n-grid>
</template>
<script setup lang="ts">
import { useECharts } from "@/hooks/useEcharts";
import { Ref } from "vue";
import { useApp } from '@/hooks/useApp';
import chinaJson from './china.json'
import { randomNumbers } from "@/utils";
const chartsRef = ref<HTMLDivElement | null>();
const { setOptions, echarts } = useECharts(chartsRef as Ref<HTMLDivElement>);
echarts.registerMap('china', chinaJson as any);
const outdata: string | any[] = [];
const geoCoordMap = {} as any;
/*获取地图数据*/
const mapFeatures = echarts.getMap('china').geoJson.features;
//  console.log(mapFeatures)
mapFeatures.forEach((v: any) => {
    // 地区名称
    const name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.center;
    outdata.push({
        name: name,
        value: randomNumbers(100, 10000)
    })
});
const option = {
    //提示框
    tooltip: {
        show: true,
        formatter: function (params: { value: string | any[]; name: string; }) {
            if (params.value.length > 1) {
                return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value[2] + '亿元&nbsp;&nbsp;';
            } else {
                return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value + '亿元&nbsp;&nbsp;';
            }
        },

    },
    //标题样本样式
    title: {
        top: 20,
        text: '2021年一季度31省GDP总量',
        subtext: '',
        x: 'center'
    },
    series: [{
        type: 'map',
        map: 'china',
        zoom: 1.5,
        roam: true,
        top: 150,
        scaleLimit: {
            min: 1,
            max: 3
        },
        label: {
            normal: {
                show: true,
            },
            emphasis: {
                show: false,
            }
        },
        itemStyle: {
            normal: {
                areaColor: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#3E747B'
                    }, {
                        offset: 1,
                        color: '#0D5159'
                    }],
                },
                borderColor: '#001D21',
                borderWidth: 1,
            },
            emphasis: {
                areaColor: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#073684'
                    }, {
                        offset: 1,
                        color: '#00Bbcc'
                    }],
                },
            }
        },
        data: outdata,
    }]
};
onMounted(() => {
    setOptions(option);
});
const { getContentHeight } = useApp();
const mapHeight = getContentHeight().value;
</script>
<style lang="scss" scoped>
</style>