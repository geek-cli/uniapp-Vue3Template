import config from './config';
import router from "@/router.js";

let requestTicket = false;
let requestTicketTimeout = null;
let interceptor = {
	request: null,
	response: null
}
let list = [];

// 请求获取凭证接口
const requestTicketApi = (resolve = ()=>{}) => {
	uni.request({
		method: 'POST',
		url: config.api.serviceUrl + '/ticket',
		success: (res) => {
			res.data.expiration += (new Date().getTime() / 1000);
			uni.setStorageSync('ticket', JSON.stringify(res.data));
			resolve(res.data.ticket_id)
		}
	});
}

// 获取凭证
const getTicketRequest = () => {
	return new Promise((resolve, reject) => {
		let ticket = uni.getStorageSync('ticket') ? JSON.parse(uni.getStorageSync('ticket')) : {};
		if (ticket && ticket.expiration > (new Date().getTime() / 1000)) {
			requestTicketTimeout && clearTimeout(requestTicketTimeout);
			requestTicket = false;
			resolve(ticket.ticket_id)
		} else {
			if (requestTicket) {
				clearTimeout(requestTicketTimeout);
				requestTicketTimeout = setTimeout(() => {
					requestTicket = false;
				}, 5000);
				setTimeout(() => {
					resolve('next');
				}, 100);
			} else {
				requestTicketApi(resolve)
				requestTicket = true;
			}
		}
	})
}

// 处理失败
const requestErr = (response) => {
	uni.hideLoading();
	switch (response.statusCode) {
		case 400:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			break
		case 401:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			break
		// case 403:
		// 	uni.removeStorageSync('ticket')
		// 	break
		case 404:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			break
		case 405:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			if (response.data.message === '请重新登录' || response.data.message === '账号在其他地方登录') {
				uni.removeStorageSync('token')
				uni.removeStorageSync('user')
				router.push({
					name: 'login'
				})
			}
			break
		case 408:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			break
		case 422:
			uni.hideLoading();
			console.warn('422 message')
			console.warn((Object.keys(response.data.errors.message || {}) || []).map(k => {
				return response.data.errors.message[k].join(',')
			}).join('\n') || '网络不给力！！请稍后再试')
			uni.showToast({
				title: (Object.keys(response.data.errors.message || {}) || []).map(k => {
					return response.data.errors.message[k].join(',')
				}).join('\n') || '网络不给力！！请稍后再试',
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			if (response.data.message === '请重新登录') {
				uni.removeStorageSync('token')
				uni.removeStorageSync('user')
				router.push({
					name: 'login'
				})
			}
			break
		case 500:
			if (response.data.message === 'Unauthenticated.') {
				uni.removeStorageSync('token')
				uni.removeStorageSync('user')
				router.push({
					name: 'login'
				})
			} else if (response.data.message === 'Unauthentdisable') {
				uni.removeStorageSync('token')
				uni.removeStorageSync('user')
			} else if (response.data.message === 'Unauthentdislogin') {
				uni.removeStorageSync('token')
				uni.removeStorageSync('user')
			} else {
				uni.showToast({
					title: "网络不给力！！请稍后再试",
					duration: 1000,
					mask: true,
					icon: 'none'
				});
			}
			break
		case 501:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			break
		case 502:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			break
		case 503:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			break
		case 504:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			break
		case 505:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
			break
		default:
			uni.showToast({
				title: response.data.message,
				mask: true,
				duration: 1000,
				icon: 'none'
			});
	}
}

const requestMethod = (url, params, auth, method, isLoading = true, hasFile = false) => {
	return new Promise((resolve, reject) => {
		getTicketRequest().then(ticket => {
			if (ticket === '') {
				uni.showToast({
					icon: 'none',
					title: '获取凭证失败',
					duration: 2000
				});
			} else if (ticket === 'next') {
				requestMethod(url, params, auth, method, isLoading, hasFile).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err);
				});
			} else {
				if (auth && !uni.getStorageSync('token')) {
					router.push({
						name: 'login'
					})
					uni.hideLoading();
					console.error('需要登录状态', url);
					return
				}

				let newUrl = url
				if (uni.getStorageSync("shop_id") && !hasFile) {
					if (!params) {
						params = {}
					}
					if (!params.shop_id) {
						params.shop_id = uni.getStorageSync("shop_id");
					}
				}
				if (method === 'get') {
					if (params) {
						Object.keys(params).forEach((key, index) => {
							if (index === 0) {
								newUrl = newUrl + '?' + key + '=' + params[key]
							} else {
								newUrl = newUrl + '&' + key + '=' + params[key]
							}
						})
					}
				}

				let fileHeaders = {}
				if (hasFile) {
					fileHeaders = {
						'content-type': 'application/x-www-form-urlencoded'
					}
				}

				if (isLoading) {
					//增加请求中状态  
					uni.showLoading({
						mask: true
					});
				}

				var options = {
					url: newUrl,
					data: method !== 'get' ? params : null,
					method: method,
					timeout: 20000,
					header: auth ? {
						'X-ticket': ticket,
						'Authorization': uni.getStorageSync('token'),
						...fileHeaders,
					} : {
						'X-ticket': ticket,

						...fileHeaders,
					},
					success: (res) => {
						if (res.statusCode === 200) {
							if (url.indexOf('upload/image') === -1) {
								res.data = JSON.stringify(res.data).replace(/\/storage\//g,
									config
									.imgHost + '/storage/')
								res.data = JSON.parse(res.data)
							}
							resolve(res.data);
						} else {
							// 如果ticket过期 则重新请求自身
							if(res.statusCode == 403) {
								uni.removeStorageSync('ticket')
								requestMethod(url, params, auth, method, isLoading, hasFile).then(res => {
									resolve(res)
								}).catch(err => {
									reject(err);
								});
							} else {
								// 其他错误
								reject(res.data);
							}
						}
					},
					fail: (err) => {
						console.log('失败了');
						reject(err);
					}
				}

				let _config = null
				options.complete = (response) => {
					let statusCode = response.statusCode;

					response.config = _config;

					if (process.env.NODE_ENV === 'development') {
						if (statusCode === 200) {
							// console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
						}
					}

					if (interceptor.response) {

						let newResponse = interceptor.response(response)
						if (newResponse) {
							response = newResponse
						}
					}
					if (isLoading) {
						uni.hideLoading();
					}
					
					if (statusCode !== 200 && statusCode !== 403) {
						requestErr(response)
					}
				}

				_config = Object.assign({}, options, options)
				_config.requestId = new Date().getTime()

				if (interceptor.request) {
					interceptor.request(_config)
				}

				if (process.env.NODE_ENV === 'development') {
					console.log("【" + _config.requestId + "】 地址：" + _config.url)
					if (_config.data) {
						console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config
							.data))
					}
				}

				if (hasFile) {
					delete _config.header['content-type']
					_config.filePath = _config.data
					_config.name = 'file'
					uni.uploadFile(_config);
				} else {
					uni.request(_config);
				}
			}
		})
	})
}

export default {
	post(url, params = {}, auth = true) {
		return requestMethod(url, params, auth, 'POST')
	},
	postFile(url, file, auth = true) {
		let isFile = true,
			isLoading = true
		return requestMethod(url, file, auth, 'POST', isLoading, isFile)
	},
	get(url, params = {}, auth = true) {
		return requestMethod(url, params, auth, 'GET')
	},
	put(url, params = {}, auth = true) {
		return requestMethod(url, params, auth, 'put')
	},
	// 后台静默请求, 没有请求中的状态
	bgPost(url, params = {}, auth = true) {
		let isLoading = false;
		return requestMethod(url, params, auth, 'POST', isLoading)
	},
	// 后台静默请求, 没有请求中的状态
	bgGET(url, params = {}, auth = true) {
		let isLoading = false;
		return requestMethod(url, params, auth, 'GET', isLoading)
	},
	// 获取ticket
	requestTicketApi
}
