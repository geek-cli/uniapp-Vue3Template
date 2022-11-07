## 项目构成
*uni + vue3 + pinia + vite + js + less*
## 运行
*本身以向cli兼容可同时运行在hbuilderX和cli模式下运行*
*运行前先执行: `npm install`*
### hbuilderX
1. 运行
	编辑器内选择运行和对应的运行方式即可
2. 发行
	编辑器内选择发行和对应的发行方式即可
### cli模式
1. 运行
	`npm run dev:%PLATFORM%`
2. 发行
	`npm run build:%PLATFORM%`
3. %PLATFORM% 可选项

| 值 | 平台 |
| --- | --- |
| app-plus                | app平台生成打包资源（支持build，不支持run，运行调试仍需在HBuilderX中操作）|
| h5                      | H5 |
| mp-alipay				  | 支付宝小程序 |
| mp-baidu				  | 百度小程序 |
| mp-weixin				  | 微信小程序 |
| mp-toutiao			  | 字节跳动小程序 |
| mp-lark				  | 飞书小程序 |
| mp-qq					  | qq 小程序 |
| mp-360				  | 360 小程序 |
| mp-kuaishou			  | 快手小程序 |
| mp-jd					  | 京东小程序 |
| mp-xhs				  | 小红书小程序 |
| quickapp-webview		  | 快应用(webview) |
| quickapp-webview-union  | 快应用联盟 |
| quickapp-webview-huawei | 快应用华为 |
## 项目内常用组件
*内嵌有部分常用组件无需注册，以 `<znx-文件名></znx-文件名>` 的方式使用即可，详情请看/src/commonComponents目录*
