<template>
  <div class="pie-echart">
    <BaseEchart :options="optionsComp"></BaseEchart>
  </div>
</template>

<script lang="ts" setup>
import { BaseEchart } from '@/base-ui/echart'
import { IPieData } from '../types'
import { defineProps, computed } from 'vue'

const props = defineProps<{
  roseData: IPieData[]
}>()

const optionsComp = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        // dataView: { show: true, readOnly: false },
        restore: { show: true }
        // saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
