# geek-appUpdata
一款用于APP更新的组件，支持热更新、强制更新、普通更新。

## 使用方法
从插件市场直接使用HBuilderX 导入并修改几个配置即可直接快速使用。

## 需要修改的配置内容
1. 找到插件的hooks文件夹中的 appUpdata.js 的 `50~95` 行注释中带有`**`的部分按照注释修改即可。
2. 前往geek-appUpdata.vue 第174行 填写AppStore id，即可在ios非热更新时跳转到APPStore中更新，不使用可忽略此项。

## 组件使用示例(非热更新)
修改好配置内容后即可根据下方示例直接使用
```vue
<view class="">
	<geek-appUpdata
		title="发现新版本"
		downloadBtnTextIOS="点击跳转更新"
		downloadBtnText="立即升级"
		cancelDownloadBtnText="暂不升级"
		downLoadingText="安装包下载中，请耐心等待"
		:intervalAlertUserUpdataTime="7"
	></geek-appUpdata>
</view>
```

## 热更新示例
修改好配置内容后在APP.vue文件中粘贴下方内容即可
```vue
<script setup>
	import {
		onLaunch,
		onShow,
		onHide
	} from '@dcloudio/uni-app';
	
	// 使用app更新逻辑
	import appUpdata from '/src/uni_modules/geek-appUpdata/hooks/appUpdata.js';
	
	let {
		hotAppUpdata
	} = $(appUpdata());
	
	onLaunch((option) => {
		console.log(option);
		console.log('App Launch');
	})
	onShow(() => {
		// #ifdef APP-PLUS
		// app热更新
		hotAppUpdata();
		// #endif
	})
</script>
```

## API
### Props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | -- | -- | -- |
| title | 更新标题 | String | 发现新版本 | - |
| downloadBtnTextIOS | 下载按钮ios文字 | String | 立即跳转更新 | - |
| downloadBtnText | 下载按钮文字 | String | 立即升级 | - |
| cancelDownloadBtnText | 取消下载按钮文字 | String | 暂不升级 | - |
| downLoadingText | 下载中文字提示 | String | 安装包下载中，请稍后 | - |
| intervalAlertUserUpdataTime | 用户提示更新的间隔时间 单位h | Number | 6 | - |