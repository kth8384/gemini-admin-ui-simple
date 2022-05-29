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

const theme = {
  color: ["#fc97af", "#87f7cf", "#f7f494", "#72ccff", "#f7c5a0", "#d4a4eb", "#d2f5a6", "#76f2f2"],
  backgroundColor: "rgba(24, 24, 28,1)",
  textStyle: {},
  title: {
    textStyle: {
      color: "#ffffff",
    },
    subtextStyle: {
      color: "#dddddd",
    },
  },
  line: {
    itemStyle: {
      borderWidth: "4",
    },
    lineStyle: {
      width: "3",
    },
    symbolSize: "0",
    symbol: "circle",
    smooth: true,
  },
  radar: {
    itemStyle: {
      borderWidth: "4",
    },
    lineStyle: {
      width: "3",
    },
    symbolSize: "0",
    symbol: "circle",
    smooth: true,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: "#ccc",
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  candlestick: {
    itemStyle: {
      color: "#fc97af",
      color0: "transparent",
      borderColor: "#fc97af",
      borderColor0: "#87f7cf",
      borderWidth: "2",
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
    lineStyle: {
      width: "1",
      color: "#ffffff",
    },
    symbolSize: "0",
    symbol: "circle",
    smooth: true,
    color: ["#fc97af", "#87f7cf", "#f7f494", "#72ccff", "#f7c5a0", "#d4a4eb", "#d2f5a6", "#76f2f2"],
    label: {
      color: "#f1f2f5",
    },
  },
  map: {
    itemStyle: {
      areaColor: "#f3f3f3",
      borderColor: "#999999",
      borderWidth: 0.5,
    },
    label: {
      color: "#893448",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(255,178,72,1)",
        borderColor: "#eb8146",
        borderWidth: 1,
      },
      label: {
        color: "rgb(137,52,72)",
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: "#f3f3f3",
      borderColor: "#999999",
      borderWidth: 0.5,
    },
    label: {
      color: "#893448",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(255,178,72,1)",
        borderColor: "#eb8146",
        borderWidth: 1,
      },
      label: {
        color: "rgb(137,52,72)",
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#666666",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#aaaaaa",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#e6e6e6"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#666666",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#aaaaaa",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#e6e6e6"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#666666",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#aaaaaa",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#e6e6e6"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#666666",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#aaaaaa",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#e6e6e6"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: "#999999",
    },
    emphasis: {
      iconStyle: {
        borderColor: "#666666",
      },
    },
  },
  legend: {
    textStyle: {
      color: "#f7f1f1",
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: "#edd4d4",
        width: 1,
      },
      crossStyle: {
        color: "#edd4d4",
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: "#87f7cf",
      width: 1,
    },
    itemStyle: {
      color: "#87f7cf",
      borderWidth: 1,
    },
    controlStyle: {
      color: "#87f7cf",
      borderColor: "#87f7cf",
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: "#fc97af",
      borderColor: "#fc97af",
    },
    label: {
      color: "#87f7cf",
    },
    emphasis: {
      itemStyle: {
        color: "#f7f494",
      },
      controlStyle: {
        color: "#87f7cf",
        borderColor: "#87f7cf",
        borderWidth: 0.5,
      },
      label: {
        color: "#87f7cf",
      },
    },
  },
  visualMap: {
    color: ["#fc97af", "#87f7cf"],
  },
  dataZoom: {
    backgroundColor: "rgba(255,255,255,0)",
    dataBackgroundColor: "rgba(114,204,255,1)",
    fillerColor: "rgba(114,204,255,0.2)",
    handleColor: "#72ccff",
    handleSize: "100%",
    textStyle: {
      color: "#333333",
    },
  },
  markPoint: {
    label: {
      color: "#f1f2f5",
    },
    emphasis: {
      label: {
        color: "#f1f2f5",
      },
    },
  },
};
export default theme;
