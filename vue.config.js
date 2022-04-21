/*
 * @Author: CZ
 * @Date: 2022-04-14 20:15:18
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-21 16:12:08
 * @Description: 
 * @FilePath: \vue-study\vue.config.js
 */
const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/getIP': {
        target: 'https://restapi.amap.com', //配置要替换的后台接口地址
        changOrigin: true, //配置允许改变Origin
        pathRewrite: {
          '^/getIP': ''
        }
      },
    }
  },

})