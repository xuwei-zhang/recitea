module.exports = {
  runtimeCompiler: true,
  transpileDependencies: [
    'vuetify'
  ], devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 8080,
    proxy: { //配置跨域
      '/': {
          //target: 'http://127.0.0.1:9999/api', //这里后台的地址模拟的;应该填写你们真实的后台接口
           target: 'http://localhost:8081', //这里后台的地址模拟的;应该填写你们真实的后台接口

          ws: true,
          changOrigin: true, //允许跨域
          pathRewrite: {
              '^/': '' //请求的时候使用这个api就可以
          },
      }
  },
    https: false,
    hotOnly: false,
  },
}
const webpack = require('webpack')

module.exports = {
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }])
  }
}