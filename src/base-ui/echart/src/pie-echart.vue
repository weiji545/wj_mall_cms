<template>
  <div class="pie-echart">
    <base-echart :options="optionsComp"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { BaseEchart } from '@/base-ui/echart'
import { IPieData } from '../types'
import { defineProps, computed } from 'vue'

const props = defineProps<{
  pieData: IPieData[]
}>()

const optionsComp = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: props.pieData
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
