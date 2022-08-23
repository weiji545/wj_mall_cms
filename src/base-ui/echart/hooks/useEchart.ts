import * as echarts from 'echarts'

export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el, 'light', {
    renderer: 'svg'
  })
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }

  return { setOptions }
}
