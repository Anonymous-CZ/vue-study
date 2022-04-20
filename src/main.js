/*
 * @Author: CZ
 * @Date: 2022-04-14 20:15:18
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-20 14:00:34
 * @Description: 
 * @FilePath: \vue-study\src\main.js
 */
import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import SimpleUIPlugin from "@quarter/simple-ui";
import "@quarter/simple-ui/lib/style.css";
createApp(App).use({
  router,
  SimpleUIPlugin
}).mount('#app')