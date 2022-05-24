import App from './App'

import router from './router.js'; // 引入路由
// 需要全局挂在方法
import api from "@/units/server/api.js";
import Common from "@/units/Common.js";
import play from "@/units/js/itemPlay.js";

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
		// 全局挂在方法
		app.config.globalProperties.$api = api; // 请求
		app.config.globalProperties.$Common = Common; // 常用方法
		app.config.globalProperties.$play = play; // 支付方法
		return {
			app
		}
	}
// #endif
