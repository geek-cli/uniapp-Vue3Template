import api from "@/units/server/api.js";
import config from '@/units/server/config.js';

export default {
	// 动态加载图片
	img(path) {
		return `/static/img/${path}`
	},
	// 返回上一层页面
	back(delta = 1) {
		// #ifndef H5
		uni.navigateBack({
			delta
		});
		// #endif
		// #ifdef H5
		history.go(Math.abs(delta) * -1);// 兼容h5端刷新页面后的返回
		// #endif
	},
	// 上传图片
	upChooseImage(callBack, fileType = 'image', count = 1) {
		if (!uni.getStorageSync('QNToken')) {
			// 无七牛Token
			api.qiniuToken('', {
				success: (data) => {
					uni.setStorageSync('QNToken', data.upToken);
					this.upChooseImage(callBack, fileType, count)
				}
			})
			return
		}
		// 指定可上传的类型
		let upFileTypeObj = {
			image: {
				tip: '无指定类型',
			},
			avatar: {
				tip: '头像'
			},
			idCard: {
				tip: '身份证'
			},
			userNft: {
				tip: '自定义NFT'
			}
		}
	
		// 未指定类型时的警告
		if (!upFileTypeObj[fileType]) {
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
		}
		// 获取时间戳,对应的文件夹名称
		var nowDate = new Date();
		var nowDateText = nowDate.getFullYear().toString() + (nowDate.getMonth() + 1).toString() + nowDate.getDate()
			.toString();
		uni.chooseImage({
			count,
			sourceType: ['album', 'camera'],
			success(res) {
				if (res.tempFilePaths.length > 0) {
					let imgList = [];
					for (let index = 0; index < res.tempFilePaths.length; index++) {
						// 截取文件名后缀
						var suffix = res.tempFiles[index].name.split('.').pop().toLowerCase();
						// 上传七牛
						uni.uploadFile({
							url: 'http://upload-z1.qiniup.com',
							filePath: res.tempFilePaths[index],
							formData: {
								// 文件名
								'key': fileType + '/' + nowDateText + '/' + new Date().getTime() + Math
									.floor(Math.random() * 100 + 1) + '.' + suffix,
								'token': uni.getStorageSync('QNToken')
							},
							success: (data) => {
								data = JSON.parse(data.data)
								// 拼接文件名
								imgList.push('https://jushashucang.dns.sdyddm.cn/' + data.key)
								if (imgList.length == res.tempFilePaths.length) {
									callBack && callBack(imgList)
								}
							}
						})
					}
				}
			},
			fail: err => {
				console.log(err);
			}
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
	},
	
	// 表单验证方法
	// 该方法验证失误会返回一个fasle
	// 成功之后则会返回一个 key: value的形式 会去除其他的验证
	// 如有不需要验证的属性，则该属性不写成key: {}, 而是key:value
	// 自定义验证则需要custom是一个函数 且 需要返回 true 或 false
	// 表单验证方法
	// 该方法验证失误会返回一个fasle
	// 成功之后则会返回一个 key: value的形式 会去除其他的验证
	// 如有不需要验证的属性，则该属性不写成key: {}, 而是key:value
	// 自定义验证则需要custom是一个函数 且 需要返回 true 或 false
	formValidation(reg) {
		let copy = Object.assign({}, reg);
		for (var key in copy) {
			if (Object.prototype.toString.call(copy[key]) == '[object Object]') {
				// 如果存在自定义验证
				if (copy[key].custom && Object.prototype.toString.call(copy[key].custom) == '[object Function]') {
					let result = copy[key].custom({
						value: copy[key].value,
						name: key
					});
					if (!result) {
						return false;
					}
				} else if (!copy[key].value) {
					// 如果遇到未通过验证的值则返回false
					this.commonToast(copy[key].err);
					return false;
				}
			}
		}
		// 通过全部验证后 去除验证仅保留值
		for (var key in copy) {
			if (Object.prototype.toString.call(copy[key]) == '[object Object]') {
				copy[key] = copy[key].value;
			}
		}
		return copy
	}
};