<script setup>
	import {
		onLaunch,
		onShow,
		onHide
	} from '@dcloudio/uni-app';
	
	// 获取ticket方法
	import request from '/src/units/server/request.js';
	// 使用消息推送逻辑
	import useAppPush from '/src/hooks/useAppPush.js';
	let appPush = useAppPush();
	// 使用app更新逻辑
	import appUpdata from '/src/uni_modules/geek-appUpdata/hooks/appUpdata.js';
	
	let {
		hotAppUpdata
	} = $(appUpdata());
	
	onLaunch((option) => {
		console.log(option);
		console.log('App Launch');
		// #ifdef APP-PLUS
		// 处理系统透传消息
		appPush.receive();
		// 处理系统消息点击
		appPush.click();
		// #endif
		// 请求ticket
		// request.requestTicketApi();
	})
	onShow(() => {
		// #ifdef APP-PLUS
		// app热更新
		hotAppUpdata();
		// #endif
	})
	onHide(() => {
		console.log('App Hide');
	})
</script>

<style>
	/*每个页面公共css */
</style>
