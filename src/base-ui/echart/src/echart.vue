<template>
  <div class="echart">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)
const echartRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="less"></style>
