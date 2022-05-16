import api from "@/units/servers/api";
import config from './servers/config'

export default {
	// 上传图片
	upChooseImage(callBack) {
		uni.chooseImage({
			count: 1,
			sourceType: ['album'],
			success(res) {
				if (res.tempFilePaths.length > 0) {
					let filePath = res.tempFilePaths[0];
					//压缩图片
					uni.compressImage({
						src: filePath,
						quality: 80,
						success: res => {
							console.log(res.tempFilePath)
						}
					})
					//进行上传操作
					api.uploadPic(filePath, "task", {
						success: (data) => {
							callBack && callBack(JSON.parse(data).data)
						},
					});
				}
			}
		});
	},

	// 获取个人信息
	getUserInfo(success) {
		api.userInfo("", {
			success: (data) => {
				uni.setStorageSync('user', data.user)
				if (success) {
					success(data.user)
				}
			},
		});
	},

	// 支付
	requestPayment(type, orderInfo, callBack, error) {
		uni.requestPayment({
			provider: type,
			orderInfo: orderInfo, //微信、支付宝订单数据
			success:  (res)=> {
				console.log('success:' + JSON.stringify(res));
				callBack && callBack(res)
			},
			fail:  (err)=>{
				console.log('fail:' + JSON.stringify(err));
				error && error(err)
			}
		});
	},

	// 图片增加路径
	returnImgUrl(path) {
		return config.imgHost + path
	},

	// 页面跳转
	commonJump(path, clear = false) {
		if (!path) {
			console.warn('请检查跳转地址，跳转地址为空')
			return
		}
		if (clear) {
			uni.reLaunch({
				url: path,
			});
		} else {
			uni.navigateTo({
				url: path,
			});
		}
	},

	// 页面弹出框
	commonToast(title, type = 'none', callback) {
		var toastDuration = 1000
		var toastParams = {
			title: title,
			duration: toastDuration,
			icon: type
		}
		uni.showToast(toastParams);
		if (callback) {
			setTimeout(() => {
				callback()
			}, toastDuration);
		}
	},

	// 页面弹出模态框
	commonMoadl(params) {
		uni.showModal({
			title: params.title, // 提示标题
			content: params.content, // 提示内容
			showCancel: params.showCancel, // 是否显示取消按钮
			cancelText: params.cancelText, // 取消文字按钮
			confirmText: params.confirmText, // 确认按钮文字
			confirmColor: params.confirmColor, // 确认文字颜色
			success: (res) => {
				if (res.confirm) {
					params.success && params.success()
				} else if (res.cancel) {
					params.cancel && params.cancel()
				}
			},
		});
	},

	// app更新
	appUpData(callBack) {
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
			api.fetchVersionNumber("", {
				success: (data) => {
					if (data.version_number * 1 > wgtinfo.version * 1) {
						return
						// 需要升级
						this.commonMoadl({
							title: "检测更新",
							content: "已有最新版，请尽快升级",
							showCancel: false,
							confirmText: "去下载",
							success: () => {
								plus.runtime.openURL(
									config.imgHost +
									"/pages/download/download"
								);
							},
							cancel: () => {
								uni.removeStorageSync('token')
								uni.removeStorageSync('user')
								plus.runtime.openURL(
									config.imgHost +
									"/pages/loginIn/loginIn"
								);
							}
						});
					} else {
						callBack && callBack()
					}
				},
			});
		});
		// #endif

		// #ifdef H5
		callBack && callBack()
		// #endif
	},
	
	// 复制
	copyText(obj, callback) {
		uni.setClipboardData({
		    data: obj.value,
		    success: ()=>{
		        uni.showToast({
		        	icon: "none",
					title: obj.alertText ? obj.alertText : "复制成功",
					mask: true,
					duration: 800,
					success: res=>{
						callback && callback(res)
					}
		        })
		    }
		});
	},
	
	// 获取用户定位
	getUserLocation(obj) {
		uni.getLocation({
			type: "gcj02",
			geocode: true,
			isHighAccuracy: true,
			success: (res)=>{
				obj.success && obj.success(res);
			},
			fail: err=>{
				obj.fail && obj.fail(err);
			}
		})
	}
};