import {
	ref,
	reactive,
	inject,
	toRefs,
	computed,
	watch
} from "vue";
import api from "@/units/server/api.js";
export default function appUpdata() {
	// 平台名称
	let platformName = ref(null);
	// 下载地址
	let webDownloadPath = ref(null);
	// 是否热更新
	let isWGT = ref(false);
	// 是否强制更新
	let isForceUpdata = ref(false);
	// 更新内容描述
	let updataContent = ref('');
	// 版本号
	let version = ref(null);
	// 下载状态
	let downloading = ref(false);
	// 是否下载完成
	let downloadSuccess = ref(false);
	// 下载进度
	let downLoadPercent = ref(0);
	// 目前app已下载大小
	let downloadedSize = ref(0);
	// app总大小
	let packageFileSize = ref(0);

	let tempFilePath = ref(''); // 要安装的本地包地址
	// 之前的安装的本地包地址
	let installForBeforeFilePath = ref('');
	// 创建的下载任务
	let downloadTask = ref(null);

	// 检查版本 需要更新时才会触发回调
	let checkVersion = ()=> {
		return new Promise((resolve, reject) => {
			// #ifdef APP-PLUS
			uni.getSystemInfo({
				success: (res) => {
					platformName.value = res.platform;
					// 获取本机版本号
					plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
						// 与后台交互获取版本号 请求接口地址参数自己填写
						uni.request({
						    url: '', // ** 接口地址 
							// **参数
						    data: {},
							// **自定义请求头信息
						    header: {}
						}).then(data=>{
							// app本身版本
							let appVersion = wgtinfo.version.split('.');
							// ** 后台版本 版本号类型格式0.0.0 **
							let resVersion = '';
							// 是否需要更新
							let isNeedUpdata = false;
							
							// 循环对比每一位版本号
							for (
								let i = 0; i < Math.max(appVersion.length,
									resVersion.length); i++
							) {
								// 没有则赋值为0
								if (resVersion[i] === undefined) resVersion[
									i] = 0
								if (appVersion[i] === undefined) appVersion[
									i] = 0
								
								// 如果需要更新
								if (resVersion[i] > appVersion[i]) {
									// 读取下载好的包的缓存
									const appDownLoadTempFilePath = uni.getStorageSync(
											'appDownLoadTempFilePath');
											
									// 如果已经有下载好的包
									if (appDownLoadTempFilePath) {
										tempFilePath.value = appDownLoadTempFilePath;
										downloadSuccess.value = true;
										installForBeforeFilePath.value = appDownLoadTempFilePath;
									}
										
									// ** 网络下载地址 **
									webDownloadPath.value = '';
									// **更新内容 富文本 **
									updataContent.value = '';
									// ** 是否热更新 1是 0否 **
									isWGT.value = 0;
									// ** 是否强制更新 1是 0否 **
									isForceUpdata.value = 0;
									
									// 是否需要更新
									isNeedUpdata = true;
									
									// 验证通过
									resolve();
									break;
								}
							}
							
							// 如果版本循环对比结束 确定没有需要更新版本后走catch
							if (!isNeedUpdata) {
								reject(`APP版本大于后台管理版本,APP版本: ${appVersion}, 后台管理版本: ${resVersion}`)
							}
						});
					});
				}
			});
			// #endif
		})
	}
	// 下载app
	let downloadPackage = () => {
		if(!downloadTask.value || !isWGT.value) {
			downloading.value = true;
			
			//下载包
			downloadTask.value = plus.downloader.createDownload(webDownloadPath.value, {}, (download, status) => {
				if (status == 200) {
					downloadSuccess.value = true;
					tempFilePath.value = download.filename;
					if(isWGT.value) {
						installPackage();
					}
				}
				// 清空下载进度
				downLoadPercent.value = 0;
				downloadedSize.value = 0;
				packageFileSize.value = 0;
				downloadTask.value = null;
			});
			
			downloadTask.value.start();
			
			downloadTask.value.addEventListener("statechanged", (task, status) => {
				switch (task.state) {
					case 3:
						// 更新下载进度
						downLoadPercent.value = parseInt(task.downloadedSize / task.totalSize * 100);
						downloadedSize.value = (task.downloadedSize / Math.pow(1024, 2)).toFixed(2);
						packageFileSize.value = (task.totalSize / Math.pow(1024, 2)).toFixed(2);
						break;
				}
			});
		}
	}
	// 安装app
	let installPackage = () => {
		plus.runtime.install(tempFilePath.value, {
			force: false
		}, async res => {
			// wgt包，安装后会提示 更新完成，是否重启
			if (isWGT.value) {
				uni.showLoading({
					icon: 'none',
					title: '更新完成，正在重启……',
					mask: true
				})
		
				setTimeout(() => {
					uni.hideLoading();
					plus.runtime.restart();
				}, 1000)
			} else {
				uni.setStorageSync('appDownLoadTempFilePath', tempFilePath.value);
			}
		}, async err => {
			downloadSuccess.value = false;
			// 如果是安装之前的包，安装失败后删除之前的包
			if (installForBeforeFilePath.value) {
				await deleteSavedFile(installForBeforeFilePath.value)
				installForBeforeFilePath.value = '';
			}
			
			uni.showLoading({
				icon: 'none',
				title: '更新失败，请重新下载',
				mask: true
			})
		})
	}
	// 删除保存的文件
	let deleteSavedFile = (tempFilePath) => {
		uni.removeStorageSync('appDownLoadTempFilePath')
		uni.removeSavedFile({
			tempFilePath
		})
	}
	// 保存文件
	let saveFile = (tempFilePath) => {
		return new Promise((resolve, reject) => {
			uni.saveFile({
				tempFilePath,
				success({
					savedFilePath
				}) {
					uni.setStorageSync('appDownLoadTempFilePath', tempFilePath)
				},
				complete() {
					resolve()
				}
			})
		})
	}
	// 热更新
	let hotAppUpdata = () => {
		checkVersion().then(() => {
			if (isWGT.value) {
				downloadPackage()
			}
		})
	}

	return {
		webDownloadPath,
		isWGT,
		version,
		downloadTask,
		downloading,
		downloadSuccess,
		downLoadPercent,
		downloadedSize,
		packageFileSize,
		tempFilePath,
		installForBeforeFilePath,
		checkVersion,
		hotAppUpdata,
		downloadPackage,
		deleteSavedFile,
		saveFile,
		isForceUpdata,
		updataContent,
		installPackage,
		platformName
	}
}
