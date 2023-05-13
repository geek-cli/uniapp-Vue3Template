<template>
	<view class="appUploadAlertBox">
		<uni-popup ref="popup" type="center" :isMaskClick="false" @touchmove.stop.prevent>
			<view class="content_popup">
				<view class="content_top">
					<text class="content-top-text">{{title}}</text>
					<image class="content_top" style="top: 0;" width="100%" height="100%"
						src="../../img/appUploadAlertBoxBg.png">
					</image>
				</view>
				<!-- 更新详细信息 -->
				<view class="info center">
					<!-- 更新内容 -->
					<scroll-view class="info_desc_scroll" scroll-y="true">
						<rich-text :nodes="updataContent"></rich-text>
					</scroll-view>
				</view>
				<view class="footer" v-if="platformName">
					<view class="btn" v-if="downloadSuccess" @click="installPackage">
						下载完成，立即安装
					</view>
					<!-- 更新进度 -->
					<view class="progress-box flex f-c f-y-c" v-else-if="downloading">
						<progress class="progress" :percent="downLoadPercent" activeColor="#35CB60" show-info
							stroke-width="10" />
						<view style="width:100%;font-size: 28rpx;display: flex;justify-content: space-around;">
							<text>{{downLoadingText}}</text>
							<text>({{downloadedSize}}M/{{packageFileSize || 0}}M)</text>
						</view>
					</view>
					<!-- 选项 -->
					<view v-else class="btns flex f-x-b">
						<view class="btn cancel" v-if="!isForceUpdata" @click="closeUpdate">
							{{cancelDownloadBtnText}}
						</view>
						<!-- IOS -->
						<view v-if="platformName == 'ios'" class="btn confirm" :class="{all: isForceUpdata}" @click="jumpToAppStore">{{downloadBtnTextIOS}}</view>
						<!-- android -->
						<view v-else class="btn confirm" :class="{all: isForceUpdata}" @click="downloadPackage">
							{{downloadBtnText}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	/**
	 * geek-appUpdata app更新提示框
	 * @description app更新提示框，支持热更新，强制更新，普通更新，暂不更新，后台下载，更新内容展示，进度条显示，ios跳转appstore等功能。
	 * @property {String} title 更新标题。
	 * @property {String} downloadBtnTextIOS 下载按钮ios文字。
	 * @property {String} downloadBtnText 下载按钮文字。
	 * @property {String} cancelDownloadBtnText 取消下载按钮文字。
	 * @property {String} downLoadingText 下载中文字提示。
	 * @property {Number} intervalAlertUserUpdataTime 用户提示更新的间隔时间 单位h(默认6h)。
	 * @example 
	 */
	import uniPopup from '../uni-popup/components/uni-popup/uni-popup.vue';
	import {
		ref,
		reactive,
		inject,
		toRefs,
		watch,
		onMounted
	} from 'vue';
	import {
		onBackPress
	} from '@dcloudio/uni-app';
	
	// 使用app更新逻辑
	import appUpdata from '../../hooks/appUpdata.js';
	let { 
		webDownloadPath, 
		checkVersion, 
		isWGT, 
		tempFilePath, 
		installForBeforeFilePath,
		downloading,
		downloadSuccess,
		downloadPackage, 
		downLoadPercent, 
		downloadedSize, 
		packageFileSize, 
		saveFile, 
		deleteSavedFile,
		platformName,
		isForceUpdata,
		updataUserLastRefuseTime,
		updataContent,
		installPackage
		} = appUpdata();

	// 获取全局对象
	const global = inject('global');
	// 解构需要使用的部分
	const {
		$Common,
		$api
	} = global;

	let props = defineProps({
		// 更新标题
		title: {
			default: '发现新版本',
			type: String
		},
		// 下载按钮ios文字
		downloadBtnTextIOS: {
			default: '立即跳转更新',
			type: String
		},
		// 下载按钮文字
		downloadBtnText: {
			default: '立即升级',
			type: String
		},
		// 取消下载按钮文字
		cancelDownloadBtnText: {
			default: '暂不升级',
			type: String
		},
		// 下载中文字提示
		downLoadingText: {
			default: '安装包下载中，请稍后',
			type: String
		},
		// 用户提示更新的间隔时间 单位h
		intervalAlertUserUpdataTime: {
			default: 6,
			type: Number
		}
	})

	// popup
	let popup = ref(null);
	// 用户上次拒绝更新的时间
	let userLastRefuseTime = ref(uni.getStorageSync('userLastRefuseTime'));

	// 初始化
	let init = () => {
		// 如果在用户上次拒绝的时间存在
		if(userLastRefuseTime.value) {
			// 目标时间戳
			let targetTime = userLastRefuseTime.value + props.intervalAlertUserUpdataTime * 60 * 60 * 1000;
			// 现在时间戳
			let nowTime = (new Date).getTime();
			// 如果目标时间戳大于现在时间戳
			if(targetTime > nowTime) {
				// 并阻止执行
				return;
			} else {
				// 清除拒绝时间
				uni.removeStorageSync('userLastRefuseTime');
			}
		}
		
		// 检查版本 需要更新时才会触发回调
		checkVersion().then(()=>{
			// 非热更新时触发
			if(!isWGT.value) {
				// 打开更新提示
				popup.value.open();
			}
		})
	}
	
	// 跳转appstore
	let jumpToAppStore = () => {
		// 请填入appid
		plus.runtime.openURL('');
	}
	
	// 关闭更新框
	let closeUpdate = () => {
		if (downloading.value) {
			uni.showModal({
				title: '是否取消下载？',
				cancelText: '否',
				confirmText: '是',
				success: res => {
					if (res.confirm) {
						popup.value.close();
					}
				}
			});
		} else {
			popup.value.close();
			updataUserRefuseTime();
		}

		if (downloadSuccess.value) {
			// 包已经下载完毕，稍后安装，将包保存在本地
			saveFile(tempFilePath.value)
		}
	}
	
	// 更新用户拒绝时间
	let updataUserRefuseTime = ()=>{
		// 存储用户暂不升级的时间戳
		userLastRefuseTime.vlaue = (new Date).getTime();
		uni.setStorageSync('userLastRefuseTime', userLastRefuseTime.value);
	}
	
	onMounted(() => {
		init();
	})
</script>

<style lang="less" scoped>
	.appUploadAlertBox {
		:deep(.uni-popup) {
			z-index: 1000;
		}

		.bg {
			width: 100%;
		}

		.content_popup {
			width: 590rpx;
			border-radius: 20rpx;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
			padding: 235rpx 0 30rpx;
			box-sizing: border-box;
			background-color: #F2FBF6;

			.content_top {
				position: absolute;
				top: -48rpx;
				left: 0;
				width: 100.1%;
				height: 300rpx;
			}

			.content-top-text {
				font-size: 45rpx;
				font-weight: bold;
				color: #F8F8FA;
				position: absolute;
				top: 120rpx;
				left: 30rpx;
				z-index: 1;
			}

			.title {
				font-size: 48rpx;
				color: #FFFFFF;
				padding-top: 120rpx;
				margin-bottom: 110rpx;
			}

			.info {
				position: relative;
				padding: 0 30rpx;
				z-index: 2;

				.info_title {
					font-size: 35rpx;
					color: #03bcff;
				}

				.info_desc_scroll {
					height: 200rpx;
					margin: 8rpx 0 20rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					color: #000000;
					line-height: 50rpx;
				}
			}

			.footer {
				padding: 0 30rpx;

				.progress-box {
					width: 100%;
				}

				:deep(.progress) {
					width: 90%;
					height: 40rpx;
					margin-bottom: 10rpx;

					.uni-progress-bar {
						border-radius: 35rpx;

						.uni-progress-inner-bar {
							border-radius: 35rpx;
						}
					}
				}

				.btn {
					margin-top: 30rpx;
					height: 75rpx;
					line-height: 75rpx;
					border-radius: 14rpx;
					font-size: 32rpx;
					font-weight: 400;
					text-align: center;
					// background: linear-gradient(90deg, #3F63F5 0%, #3699FF 100%);
					background: #35CB60;
					color: #FFFFFF;
				}

				.btns {
					.btn {
						width: 45%;
						border-radius: 35rpx;

						&.cancel {
							background: #D9F8E7;
							color: #35CB60;
						}
						
						&.confirm {
							background: #35CB60;
							color: #FFFFFF;
							&.all {
								width: 100%;
							}
						}
					}
				}

			}
		}

		.close-img {
			width: 70rpx;
			height: 70rpx;
			z-index: 1000;
			position: absolute;
			bottom: -120rpx;
			left: calc(50% - 70rpx / 2);
		}
	}
</style>
