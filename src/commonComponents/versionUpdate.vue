<template>
	<view class="VersionUpdate-box" v-if="isShow">
		<view class="main-box" v-if="beforeDownload">
			<!-- 预留图片位 -->
			<view></view>
			<!-- 预留图片位 -->

			<view class="up-title">正在升级</view>
			<view class="up-tip">正在为您下载，请耐心等待</view>
			<view class="up-progress">
				<view class="up-progress-item" :style="{
                        width: progressVal + '%',
                    }">
					<view class="up-progress-item-text">{{ progressVal }}%</view>
				</view>
			</view>
		</view>
		<view class="main-box" v-else>
			<!-- 预留图片位 -->
			<view></view>
			<!-- 预留图片位 -->
		
			<view class="up-title">温馨提示</view>
			<view class="up-tip">发现最新版本，请立即更新</view>
			<view class="up_btn" @click="loadapp()">立即下载</view>
		</view>
	</view>
</template>

<script setup>
	/**
	 * VersionUpdate 版本更新
	 * @description 用于APP版本更新。
	 * @example <waterfall :value="flowList"></waterfall>
	 */
	import { ref, onMounted, getCurrentInstance } from "vue";
	import { getCurrentInstance } from "vue";
	let $api = getCurrentInstance().appContext.config.globalProperties.$api;
	
	// 变量
	let progressVal = ref(0);
	let isShow = ref(false);
	let beforeDownload = ref(false);
	// 挂载后
	onMounted(()=>{
		uni.getSystemInfo({
			success: (res) => {
				//检测当前平台，如果是安卓则启动安卓更新
				if (res.platform == "android") {
					// 获取本机版本号
					plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
						// 与后台交互获取版本号
						$api.fetchVersion("", {
							success: (data) => {
								let appVersion = wgtinfo.version.split('.');
								let resVersion = data.android_version_number.split('.');
								for (
									let i = 0; i < Math.max(appVersion.length,
										resVersion.length); i++
								) {
									if (resVersion[i] === undefined) resVersion[i] = 0
									if (appVersion[i] === undefined) appVersion[i] = 0
									if (resVersion[i] > appVersion[i]) {
										this.isShow = true
										console.log('发现新版本`````````````````');
										break
									}
									if (resVersion[i] < appVersion[i]) {
										this.isShow = false
										break
									}
								}
							},
						});
					});
		
				}
			}
		});
	})
	// 方法
	//点击下载事件
	let loadapp = ()=>{
		beforeDownload.value = true
		AndroidCheckUpdate();
	}
	// 安卓安装更新
	let AndroidCheckUpdate = ()=>{
		$api.downUrl({}, {
			success: (ew) => {
				var dtask =
					plus.downloader.createDownload(
						ew.app_download_url, {},
						(d, status) => {
							// 下载完成
							if (status == 200) {
								this.beforeDownload = false
								plus.runtime.install(
									plus.io.convertLocalFileSystemURL(
										d.filename
									), {},
									(e) => e,
									(error) => {
										//    安装失败
										console.log('安装失败');
									}
								);
							} else {
								//    更新失败
							}
						}
					);
				try {
					dtask.start(); // 开启下载的任务
					dtask.addEventListener(
						"statechanged",
						(task, status) => {
							// 给下载任务设置一个监听 并根据状态  做操作
							switch (task.state) {
								case 1:
									// "正在下载"
									break;
								case 2:
									// "已连接到服务器"
									break;
								case 3:
									// 获取进度
									this.progressVal =
										parseInt(
											(parseFloat(
													task.downloadedSize
												) /
												parseFloat(
													task.totalSize
												)) *
											100
										);
									break;
								case 4:
									//下载完成
									break;
							}
						}
					);
				} catch (err) {
					// 更新失败
				}
			},
		});
	}
</script>

<style lang="less" scoped>
	.VersionUpdate-box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999999999999999;

		.main-box {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: white;
			width: 80vw;
			text-align: center;
			border-radius: 10rpx;
			padding-top: 50rpx;
			padding-bottom: 30rpx;

			.up-title {
				color: #333;
				font-weight: bold;
				font-size: 28rpx;
			}

			.up-tip {
				color: #ccc;
				font-size: 24rpx;
				margin-top: 20rpx;
			}

			.up-progress {
				border-radius: 100rpx;
				overflow: hidden;
				margin: 0 10%;
				margin-top: 100rpx;
				background-color: #ccc;

				.up-progress-item {
					position: relative;
					background-color: #007AF7;
					padding: 50rpx 0;
					width: 10%;
					overflow: hidden;

					.up-progress-item-text {
						color: white;
						position: absolute;
						right: 20rpx;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
			.up_btn{
				background: #007AF7;
				border-radius: 40px;
				font-size: 28rpx;
				font-weight: bold;
				color: #FFFFFF;
				padding: 27rpx 0;
				text-align: center;
				margin: 0 50rpx;
				margin-top: 50rpx;
			}
		}
	}
</style>
