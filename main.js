import App from './App'

import router from './router.js'; // 引入路由
// 需要全局挂在方法
import api from "@/units/server/api.js";
import Common from "@/units/Common.js";
import pay from "@/units/js/itemPay.js";

// #ifndef VUE3
	import Vue from 'vue'
	Vue.prototype.$api = api;
	Vue.prototype.$Common = Common;
	Vue.config.productionTip = false;
	App.mpType = 'app'
	const app = new Vue({
		...App
	})
	app.$mount();
// #endif

// #ifdef VUE3
	import { createSSRApp } from 'vue'
	export function createApp() {
		const app = createSSRApp(App);
		// 挂载路由
		router.setupRouter(app); 
		// 配置全局变量 页面中使用 inject 接收
		app.provide('global', {
			$api: api,
			$Common: Common,
			$pay: pay
		})
		return {
			app
		}
	}
// #endif
