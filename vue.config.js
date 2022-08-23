const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './build',
  // publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://152.136.185.210:4000/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve('src'))
  }
})
