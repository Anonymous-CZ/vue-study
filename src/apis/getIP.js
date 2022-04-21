/*
 * @Author: CZ
 * @Date: 2022-04-21 15:08:23
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-21 16:15:10
 * @Description: 
 * @FilePath: \vue-study\src\apis\getIP.js
 */
// 导入axios实例
import httpRequest from '@/request/index'


// 获取信息
export default function apiGetIPInfo() {
  return httpRequest({
    url: 'getIP/v3/ip?ip=114.213.50.2&output=xml&key=7d9c33b13030631461e4e280633ffddb',
    method: 'get',
  })
}