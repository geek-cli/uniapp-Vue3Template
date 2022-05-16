export default {
	/**
		@description: --- 各大平台小程序支付
	**/
	// 微信小程序支付
	wxPlay(orderInfo, success, error) {
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
	// 字节小程序支付
	/**
		@description: --- 这里之所以不使用 uniapp 的 requestPayment 方法 是因为 用这个拉字节支付会失败也不清楚具体原因
		@description: --- 所以使用了字节的 tt.pay 方法拉起支付，因此该方法只能在字节开发工具中使用，打包成字节小程序则不影响
	**/
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
	
	// 微信公众号支付
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
		@description: --- App支付
	**/
	// 微信支付
	appWxPlay(orderInfo, success, error) {
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
	// 支付宝支付
	appAlPlay(orderInfo, success, error) {
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
	}
};