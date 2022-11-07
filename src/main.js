import router from './router.js'; // 引入路由
import { piniaInstall } from '@/stores/plugins.js'; // 引入组件
// 需要全局挂在方法
import api from "@/units/server/api.js";
import Common from "@/units/Common.js";
import pay from "@/units/js/itemPay.js";

import {
	createSSRApp
} from "vue";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
    app.use(piniaInstall);
	// 挂载路由
	router.setupRouter(app);
	// 配置全局变量 页面中使用 inject 接收
	app.provide('global', {
		$api: api,
		$Common: Common,
		$pay: pay
	})
	return {
		app,
	};
}
