/**
 * @file 这是一个用来简写支付的文件.
 */

// h5微信支付依赖
// import wxs from "jweixin-module";

export default {
	/**
		微信小程序支付.
	**/
	wxPay(orderInfo, success, error) {
		uni.requestPayment({
			provider: "wxpay",
			timeStamp: orderInfo.timeStamp,
			nonceStr: orderInfo.nonceStr,
			package: orderInfo.package,
			signType: orderInfo.signType,
			paySign: orderInfo.paySign,
			success: res=>{
				console.log('success:' + JSON.stringify(res));
				success && success();
			},
			fail: err=>{
				console.log('fail:' + JSON.stringify(err));
				error && error();
			}
		});
	},
	
	/**
		字节小程序支付.
	**/
	// 这里之所以不使用 uniapp 的 requestPayment 方法 是因为 用这个拉字节支付会失败也不清楚具体原因
	// 所以使用了字节的 tt.pay 方法拉起支付，因此该方法只能在字节开发工具中使用，打包成字节小程序则不影响
	ttPay(orderInfo, success, error) {
		tt.pay({
		  	provider:'wxpay',
		  	service: 5,
		  	orderInfo,
		  	success: res=>{
				console.log('success:' + JSON.stringify(res));
		  		success && success(res);
		  	},
			fail: err => {
				console.log('error:' + JSON.stringify(err));
				error && error(err);
			}
		})
	},
	
	/**
		微信公众号支付
	**/
	wxAccountsPay(orderInfo, success, error) {
		// (以下为微信内置支付，无需导入任何东西)
		window.WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				"appId": orderInfo.appId, //公众号名称，由商户传入
				"timeStamp": orderInfo.timeStamp, //时间戳     
				"nonceStr": orderInfo.nonceStr, //随机串     
				"package": orderInfo.package,
				"signType": orderInfo.signType, //微信签名方式：     
				"paySign": orderInfo.paySign //微信签名 
			},
			(res) =>{
				if (res.err_msg == "get_brand_wcpay_request:ok") {
						success && success(res)
				} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
						error && error(res)
				} else {
					uni.showToast({
							icon: "none",
							title: "支付失败"
					})
				}
			}
		);
	},
	 
	/**
		App微信支付
	**/
	appWxPay(orderInfo, success, error) {
		uni.requestPayment({
			provider: "wxpay",
			orderInfo,
			success: function (res) {
				console.log('success:' + JSON.stringify(res));
				success && success();
			},
			fail: function (err) {
				console.log('fail:' + JSON.stringify(err));
				error && error();
			}
		});
	},
	
	/**
		App支付宝支付
	**/
	appAlPay(orderInfo, success, error) {
		uni.requestPayment({
			provider: "alipay",
			orderInfo: orderInfo.trim(),
			success: function (res) {
				console.log('success:' + JSON.stringify(res));
				success && success()
			},
			fail: function (err) {
				console.log('fail:' + JSON.stringify(err));
				error && error()
			}
		});
	},
	
	/**
		H5微信支付
	**/
	h5Wxpay(orderInfo, success, error) {
		window.wx.config({
			debug: false, // 是否开启调试
			appId: res.appId, // 必填，公众号的唯一标识
			timestamp: res.timeStamp, // 必填，生成签名的时间戳
			nonceStr: res.nonceStr, // 必填，生成签名的随机串
			signature: res.paySign,
			jsApiList: ['chooseWXPay'] 
		});
	
		window.wx.ready(()=>{
			window.wx.chooseWXPay({
				timestamp: orderInfo.timeStamp, 
				nonceStr: orderInfo.nonceStr, // 支付签名随机串，不长于 32 位
				package: orderInfo.package, 
				signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: orderInfo.paySign, // 支付签名
				success(res) {
					success && success(res)
				},
				fail(err) {
					error && error(err)
				}
			})
		});
	},
	
	/**
		H5支付宝支付。
		
		在ios浏览器内支付完成后并不会回到设置的浏览器内，用户可手动返回，来自支付宝官方。
		
		因此此方法不同于其他支付方法，该方法没有 success 和 error，
		
		请在回到浏览器时进行判断本次交易的结果。
	**/
	h5Alpay(orderInfo) {
		// #ifdef H5
		window.location.href = orderInfo.url;
		// #endif
		// #ifdef APP-PLUS
		plus.runtime.openURL(orderInfo.url);
		// #endif
	}
};