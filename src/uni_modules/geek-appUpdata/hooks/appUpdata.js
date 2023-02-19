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
	let platformName = $ref(null);
	// 下载地址
	let webDownloadPath = $ref(null);
	// 是否热更新
	let isWGT = $ref(false);
	// 是否强制更新
	let isForceUpdata = $ref(false);
	// 更新内容描述
	let updataContent = $ref('');
	// 版本号
	let version = $ref(null);
	// 下载状态
	let downloading = $ref(false);
	// 是否下载完成
	let downloadSuccess = $ref(false);
	// 下载进度
	let downLoadPercent = $ref(0);
	// 目前app已下载大小
	let downloadedSize = $ref(0);
	// app总大小
	let packageFileSize = $ref(0);

	let tempFilePath = $ref(''); // 要安装的本地包地址
	// 之前的安装的本地包地址
	let installForBeforeFilePath = $ref('');
	// 创建的下载任务
	let downloadTask = $ref(null);

	// 检查版本 需要更新时才会触发回调
	let checkVersion = ()=> {
		return new Promise((resolve, reject) => {
			// #ifdef APP-PLUS
			uni.getSystemInfo({
				success: (res) => {
					platformName = res.platform;
					// 获取本机版本号
					plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
						// 与后台交互获取版本号
						api.hotUpdateConfig("").then(data => {
							data = data.log;
							
							// 赋值
							let appVersion = wgtinfo.version.split('.');
							let resVersion = data.app_version.split('.');
							// 是否需要更新
							let isNeedUpdata = false;
							for (
								let i = 0; i < Math.max(appVersion.length,
									resVersion.length); i++
							) {
								if (resVersion[i] === undefined) resVersion[
									i] = 0
								if (appVersion[i] === undefined) appVersion[
									i] = 0
			
								if (resVersion[i] > appVersion[i]) {
									const appDownLoadTempFilePath = uni.getStorageSync(
											'appDownLoadTempFilePath');
									// 如果已经有下载好的包
									if (appDownLoadTempFilePath) {
										tempFilePath = appDownLoadTempFilePath;
										downloadSuccess = true;
										installForBeforeFilePath = appDownLoadTempFilePath;
									}
			
									// 网络下载地址
									webDownloadPath = data.app_download_url;
									// 更新内容
									updataContent = data.update_content;
									// 是否热更新
									isWGT = Boolean(data.is_hot_update * 1);
									// 是否强制更新
									isForceUpdata = Boolean(data.app_is_force_update * 1);
									// 是否需要更新
									isNeedUpdata = true;
									// 验证通过
									resolve();
									break;
								}
							}
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
		if(!downloadTask || !isWGT) {
			downloading = true;
			
			//下载包
			downloadTask = plus.downloader.createDownload(webDownloadPath, {}, (download, status) => {
				if (status == 200) {
					downloadSuccess = true;
					tempFilePath = download.filename;
					if(isWGT) {
						installPackage();
					}
				}
				// 清空下载进度
				downLoadPercent = 0;
				downloadedSize = 0;
				packageFileSize = 0;
				downloadTask = null;
			});
			
			downloadTask.start();
			
			downloadTask.addEventListener("statechanged", (task, status) => {
				switch (task.state) {
					case 3:
						// 更新下载进度
						downLoadPercent = parseInt(task.downloadedSize / task.totalSize * 100);
						downloadedSize = (task.downloadedSize / Math.pow(1024, 2)).toFixed(2);
						packageFileSize = (task.totalSize / Math.pow(1024, 2)).toFixed(2);
						break;
				}
			});
		}
	}
	// 安装app
	let installPackage = () => {
		plus.runtime.install(tempFilePath, {
			force: false
		}, async res => {
			// wgt包，安装后会提示 更新完成，是否重启
			if (isWGT) {
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
				uni.setStorageSync('appDownLoadTempFilePath', tempFilePath);
			}
		}, async err => {
			downloadSuccess = false;
			// 如果是安装之前的包，安装失败后删除之前的包
			if (installForBeforeFilePath) {
				await deleteSavedFile(installForBeforeFilePath)
				installForBeforeFilePath = '';
			}
		
			$Common.commonToast('更新失败，请重新下载')
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
			if (isWGT) {
				downloadPackage()
			}
		})
	}

	return $$({
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
	})
}
