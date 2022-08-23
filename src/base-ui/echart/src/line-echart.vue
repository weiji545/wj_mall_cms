<template>
  <div class="line-echart">
    <base-echart :options="optionsComp"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { BaseEchart } from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  xAxisData: any[]
  yData: any[]
}>()

const optionsComp = computed(() => {
  return {
    color: ['#80FFA5'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xAxisData
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '销量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: props.yData
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
