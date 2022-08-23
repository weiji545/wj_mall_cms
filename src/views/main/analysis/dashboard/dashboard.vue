<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <WjCard title="分类商品数量(饼图)">
          <pie-echart :pie-data="countComp"></pie-echart>
        </WjCard>
      </el-col>
      <el-col :span="10">
        <WjCard title="不同城市商品销量"></WjCard>
      </el-col>
      <el-col :span="7">
        <WjCard title="分类商品数量(玫瑰图)">
          <rose-echart :rose-data="saleComp"></rose-echart>
        </WjCard>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <WjCard title="分类商品的销量">
          <line-echart v-bind="favorComp"></line-echart>
        </WjCard>
      </el-col>
      <el-col :span="12">
        <WjCard title="分类商品的收藏">
          <bar-echart v-bind="favorComp"></bar-echart>
        </WjCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import WjCard from '@/base-ui/card'
import { PieEchart, RoseEchart, LineEchart, BarEchart } from '@/base-ui/echart'
import { computed, ref } from 'vue'
import { EChartsOption } from 'echarts'

import {
  getAddressSale,
  getGoodsCount,
  getGoodsFavor,
  getGoodsSale
} from '@/service/main/dashboard'

const goodsCount = ref<any[]>([])
const goodsSale = ref<any[]>([])
const goodsFavor = ref<any[]>([])
const AddressSale = ref<any[]>([])

const getCount = async () => {
  const res = await getGoodsCount()
  goodsCount.value = res.data
}
const countComp = computed(() => {
  return goodsCount.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})
const getSale = async () => {
  const res = await getGoodsSale()
  goodsSale.value = res.data
}
const saleComp = computed(() => {
  return goodsSale.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})
const getFavor = async () => {
  const res = await getGoodsFavor()
  goodsFavor.value = res.data
}
const favorComp = computed(() => {
  const xAxisData: string[] = []
  const yData: number[] = []
  for (const item of goodsFavor.value) {
    xAxisData.push(item.name)
    yData.push(item.goodsFavor)
  }
  return { xAxisData, yData }
})
const getAddress = async () => {
  const res = await getAddressSale()
  AddressSale.value = res.data
}
getCount()
getSale()
getFavor()
getAddress()

const options: EChartsOption = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
