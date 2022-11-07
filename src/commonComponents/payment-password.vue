<template>
	<view>
		<znx-payment-password-modal ref="ssModal" :mode="_parentMode" :position="_parentPosition" @change="changeModal">
			<view class="digital-keyboard-modal" :class="'digital-keyboard-modal-' + _mode">
				<view class="dk-close" v-if="_mode !== 1 && _mode !== 4" @click="close()">
					<icon type="clear" color="#333" :size="u50"></icon>
				</view>
				<swiper class="dk-swiper" :current="current">
					<swiper-item @touchmove.prevent.stop>
						<view class="top-bg-view">
							<view @click="onHideKeyBoard" class="left-view">
								<!-- <image style="width: 32rpx; height: 32rpx;" src="@/static/img/back.png" mode="aspectFit"></image> -->
							</view>
							<view class="dk-title">{{_titleObj.title}}</view>
							<view class="left-view">
								<image style="width: 32rpx; height: 32rpx;" mode="aspectFit"></image>
							</view>
						</view>
						<!-- <view class="dk-subtitle">{{_titleObj.subTitle}}</view> -->
						<view class="pwd-box clearfix" @click="getKeyboard">
							<view class="pwd-text" v-for="(item,index) in _digits" :key="index" :data-index="index" :class="{active:(activeInput == index)}">{{payPassWord[index]}}</view>
						</view>
					</swiper-item>
					<!-- 设置新安全密码 -->
					<block v-if="_mode === 2 || _mode === 5">
						<swiper-item @touchmove.prevent.stop>
							<view class="dk-title">{{_titleObj.title}}</view>
							<view class="dk-subtitle">{{_titleObj.twoSubTitle}}</view>
							<view class="pwd-box clearfix" @click="getKeyboard">
								<view class="pwd-text" v-for="(item,index) in _digits" :key="index" :data-index="index" :class="{active:(activeInput==index)}">{{payPassWord[index]}}</view>
							</view>
						</swiper-item>
					</block>
					<!-- 修改安全密码 -->
					<block v-else-if="_mode === 3">
						<swiper-item @touchmove.prevent.stop>
							<view class="dk-title">{{_titleObj.twoTitle}}</view>
							<view class="dk-subtitle">{{_titleObj.twoSubTitle}}</view>
							<view class="pwd-box clearfix" @click="getKeyboard">
								<view class="pwd-text" v-for="(item,index) in _digits" :key="index" :data-index="index" :class="{active:(activeInput==index)}">{{payPassWord[index]}}</view>
							</view>
						</swiper-item>
						<swiper-item @touchmove.prevent.stop>
							<view class="dk-title">{{_titleObj.threeTitle}}</view>
							<view class="dk-subtitle">{{_titleObj.threeSubTitle}}</view>
							<view class="pwd-box clearfix" @click="getKeyboard">
								<view class="pwd-text" v-for="(item,index) in _digits" :key="index" :data-index="index" :class="{active:(activeInput==index)}">{{payPassWord[index]}}</view>
							</view>
						</swiper-item>
					</block>
				</swiper>
				<block v-if="_mode !== 1 && _mode !== 4">
					<view class="pwd-tips">安全密码为6位数字，用于提现、设置密保、添加银行卡等操作，可保障资金安全</view>
					<view class="pwd-tips pwd-tips-errot">{{msgText}}</view>
				</block>
				<view class="pwd-forget" :class="_safeTips ? 'safe-view' :''">
					<text v-if="_forget && _mode === 1" @click="forgetPwd">忘记安全密码</text>
					<text v-if="_safeTips && _mode === 1" >安全输入键盘</text>
				</view>
				<view class="digital-keyboard" :class="{'digital-keyboard-show' : dkFlag || _mode === 1 || _mode === 4}">
					<view class="dk-down" v-if="_mode !== 1 && _mode !== 4">
						<block v-if="showPrevText">
							<view class="dk-submit dk-return" @click="changeSwiper(-1)">上一步</view>
						</block>
						<view class="dk-down-icon" @click="changeKeyboard(!dkFlag)"></view>
						<block v-if="trigger === 'auto' && !(_mode === 2 && current === 0)">
							<view class="dk-submit" @click="submit(true)">完成</view>
						</block>
					</view>
					<view class="digital-key-box clearfix">
						<view class="num" v-for="item in digitalList" :key="item" :class="{'no-num':(item === '' || item === '-1')}"
						 @click="getKeyNumber(item)">{{item}}</view>
					</view>
				</view>
			</view>
		</znx-payment-password-modal>
	</view>
</template>

<script setup>
	import { ref, reactive, getCurrentInstance, computed, watch } from "vue";
	
	// props 
	let props = defineProps({
		value: {
			type: String,
			default: ''
		},
		digits: {
			type: [Number, String],
			default: 6
		},
		forget: {
			type: Boolean,
			default: true
		},
		safeTips: {
			type: Boolean,
			default: false
		},
		/*
		*	可选值说明（这一个顺序最好不要改，跟当前步骤步进行有关系，自动提交要用到mode跟current的判断  是否要自动提交）
		*	1 安全密码校验（用于校验安全）
		*	2 设置安全密码（2步  输入=》确认输入）
		*	3 修改安全密码（3步 原安全密码=》输入=》确认输入）
		*	4 找回登录密码(同mode = 1一样，就怕后端校验接口不一样而额外添加的一个mode)
		*	5 重置安全密码
		*/
		mode: {
			type: [Number, String],
			default: 1
		},
		/*
		*	可选值说明
		*	hand 手动
		*	auto 自动
		*/
		trigger: {
			type: String,
			default: 'auto'
		},
		userName: {
			type: String,
			default: ''
		}
	})
	let emit = defineEmits(['cancel', 'submit'])
	
	let activeInput = ref(0); // 当前输入的下标
	let digitalList = reactive(['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '-1']);//键盘
	let paymentPwd = ref(''); // 安全密码内容
	let dkFlag = ref(true); // 安全密码键盘的显示与隐藏
	let current = ref(0);
	let paymentPwds = reactive([]);// 上一次安全密码内容,历史安全密码,
	let msgText = ref('');
	let u50 = ref(uni.upx2px(50));
	let ssModal = ref(null);
	
	// 计算属性
	let payPassWord = computed(()=>{
		var payPassWord = paymentPwd.value.split('') || [];
		payPassWord.fill('*');
		return payPassWord;
	})
	let _forget = computed(()=>{
		return String(props.forget) === 'false' ? false : true;
	})
	let _safeTips = computed(()=>{
		return String(props.safeTips) === 'false' ? false : true;
	})
	let _digits = computed(()=>{
		return isNaN(props.digits) ? 6 : parseInt(props.digits);
	})
	
	let _mode = computed(()=>{
		if(isNaN(props.mode) || !props.mode){
			return 1;
		}
		return +props.mode
	})
	let _titleObj = computed(()=>{
		let arr = [
			{
				title: '输入交易密码',
				subTitle: '安全输入键盘',
			},
			{
				title: '设置安全密码',
				subTitle: '请设置安全密码',
				twoSubTitle: '请再次输入安全密码以确认'
			},
			{
				title: '修改安全密码',
				twoTitle: '设置安全密码',
				threeTitle: '设置安全密码',
				subTitle: '请输入安全密码 以验证身份',
				twoSubTitle: '请设置新的安全密码',
				threeSubTitle: '请再次输入安全密码以确认',
			},
			{
				title: '输入安全密码',
				subTitle: '请输入安全密码'
			},
			{
				title: '重置安全密码',
				subTitle: '请输入安全密码',
				twoSubTitle: '请再次输入安全密码以确认'
			}
		]
		return arr[_mode.value - 1];
	})
	
	let _parentMode = computed(()=>{
		return _mode.value === 1 || _mode.value === 4 ? 'full' : 'cover';
	})
	let _parentPosition = computed(()=>{
		return _mode.value === 1 || _mode.value === 4 ? 'bottom' : 'middle';
	})
	let showPrevText = computed(()=>{
		return current.value >= (_mode.value - 1) || (_mode.value === 5 && current.value > 0) ? true : false;
	})
	
	// 方法
	let onHideKeyBoard = ()=>{
		modalFun('hide');
	}
	// 模态框显示或者关闭的回调
	let changeModal = (e)=>{ // 返回是一个Boolean值 
		if(e){
			current.value = 0;
			changeKeyboard();//默认拉起键盘
		} else {
			changeKeyboard(false);//默认拉起键盘
			clearAll();
		}
	}
	// 开关键盘
	let changeKeyboard = (flag = true)=>{
		dkFlag.value = flag;
		if(!flag) {
			activeInput.value = -1
		}
	}
	/*
		pro可选址
		show	显示
		hide	隐藏
		toggle	动态判断
	*/
	let modalFun = (pro)=>{
		pro ? ssModal.value[pro]() : '';
	}
	let clear = ()=>{
		paymentPwd.value = '';
		activeInput.value = 0;
		paymentPwds.splice(current.value, 1);
	}
	let clearAll = ()=>{
		paymentPwd.value = '';
		activeInput.value = 0;
		current.value = 0;
		paymentPwds = [];
	}
	let showError = (msg)=>{
		if(!msg) return msgText.value = '';
		if(_mode.value !== 1 && _mode.value !== 4){
			msgText.value = msg;
		}else{
			uni.showToast({
				title: msg
			})
		}
	}
	let forgetPwd = ()=>{
		console.log('这里是忘记密码跳转逻辑');
	}
	let cancel = ()=>{
		emit('cancel');
	}
	let close = ()=>{
		let tips = '';
		if(_mode === 2){
			tips = '您是否要放弃设置安全密码';
		}else if(_mode === 5){
			tips = '您是否要放弃重置安全密码';
		}else{
			tips = '您是否要放弃修改安全密码';
		}
		uni.showModal({
			title: '关闭提示',
			content: tips,
			confirmText: '我再想想',
			cancelText: '关闭',
			success: (res) => {
				if(!res.confirm){
					modalFun('hide');
				}
			}
		})
	}
	let submit = (clickFlag)=>{
		if(props.trigger !== 'auto' && !clickFlag) return;
		if(paymentPwd.value.length !== _digits.value){
			showError('请输入' + _digits.value + '位安全密码');
		}else{
			showError('');
			if(_mode.value === 5 || _mode.value === 4 || current.value >= (_mode.value - 1)){
				if(_mode.value === 5 && current.value === 0){//下一步，再次输入
					return changeSwiper(1);
				}
				if(current.value > 0){//需要校验2次安全密码的是否相等
					if(paymentPwd.value !== paymentPwds[current.value - 1]){
						showError('两次安全密码输入不一致');
						setTimeout(() => {
							paymentPwd.value = '';
							paymentPwds[current.value] = '';
							activeInput.value = 0;
						}, 300)
						return ;
					}
					showError('');
					if(_mode.value === 2){//设置安全密码
						uni.showLoading({
							title: '正在设置密码'
						});
						// 如果不把逻辑卸载这里面，直接把setTimeout删除即可
						setTimeout(() => {//模拟请求，把这个换成ajax请求哈，或者emit出去 外面去请求，但是建议都集成在这边 省的写一堆重置代码
							uni.hideLoading();
							let response = {//模拟返回
								code: 1,
								value: paymentPwd.value
							}
							if(response.code === 1){
								emit('submit', {//这里是传出去给调用者的，参数任意下，只要能区分就行
									type: 'reset',
									value: paymentPwd.value
								});
								modalFun('hide');
							}
						}, 1000)
					}else{//修改安全密码
						uni.showLoading({
							title: '正在重置密码'
						});
						// 如果不把逻辑卸载这里面，直接把setTimeout删除即可
						setTimeout(() => {//模拟请求，把这个换成ajax请求哈，或者emit出去 外面去请求，但是建议都集成在这边 省的写一堆重置代码
							uni.hideLoading();
							let response = {//模拟返回
								code: 1,
								msg: '重置新安全密码成功'
							}
							if(response.code === 1){
								emit('submit', {
									type: 'modify',
									value: paymentPwd.value
								});
								modalFun('hide');
							}
						}, 1000)
					}
					return ;
				}
				checkSafePwd('check');
			}else{
				if(_mode.value === 3 && current.value === 0){//校验安全密码正确性
					checkSafePwd('verify');
					return ;
				}
				changeSwiper(1);
			}
		}
	}
	let checkSafePwd = (type)=>{
		uni.showLoading({
			title: '校验安全密码中'
		});
		setTimeout(() => {//模拟请求，把这个换成ajax请求哈，或者emit出去 外面去请求，但是建议都集成在这边 省的写一堆重置代码
			uni.hideLoading();
			let response = {//模拟返回
				code: 1,
				msg: '密码正确'
			}
			if(response.code === 1){
				if(type === 'check'){
					emit('submit', {//设置或者重置新安全密码
						type: 'check',
						value: paymentPwd.value
					});
					modalFun('hide');
				}else{
					changeSwiper(1);//执行下一步
				}
			}else{
				clear();
				if(type !== 'check'){
					showError(response.msg);
				}
			}
		}, 0)
	}
	let changeSwiper = (num)=>{
		if(isNaN(num)){
			num = 1;
		}
		current.value += num;
		paymentPwd.value = paymentPwds[current.value] || '';
		let activeInput = paymentPwd.value.length
		activeInput = activeInput - (activeInput >= _digits.value ? 1 : 0);
	}
	let getKeyNumber = (val)=>{
		let paymentPwdArr = paymentPwd.value.split('');
		if (val === '' || (val != -1 && paymentPwdArr.length === _digits.value)) { //空或者已经达到最大值
			
			if(paymentPwdArr.length === _digits.value && props.trigger === 'auto'){
				submit();
				return ;
			}
			return false;
		} else if (val != -1) { //数字输入
			paymentPwdArr.splice(activeInput.value, 0, val);
			activeInput.value++;
			paymentPwd.value = paymentPwdArr.join('');
			paymentPwds[current.value] = paymentPwd.value;
			if(paymentPwdArr.length === _digits.value && props.trigger === 'auto'){
				submit();
				return ;
			}
		} else { //删除
			if (activeInput.value >= 0) {
				activeInput.value !== 0 && activeInput.value--;
				paymentPwdArr.splice(activeInput.value, 1);
				paymentPwd.value = paymentPwdArr.join('');
				paymentPwds[current.value] = paymentPwd.value;
			}
		}
	}
	let getKeyboard = e=>{
		let index = e && e.target.dataset.index;
		if (index === undefined) {
			activeInput.value = 0;
			changeKeyboard(false);
			return ;
		}
		var _length = paymentPwd.value.length;
		activeInput.value = index <= _length ? index : _length;
		changeKeyboard();
	}

	// 暴露出去的方法
	defineExpose({
		modalFun
	})

</script>

<style lang="less">
	.digital-keyboard-modal{
		height: 100%;
		background-color: #fff;
		&.digital-keyboard-modal-1, &.digital-keyboard-modal-4 {
			height: auto;
			// border-radius: 20px 20px 0px 0px;
			
			padding-padding: 0;
			padding-padding: constant(safe-area-inset-top);
			padding-padding: env(safe-area-inset-top);
		}
		&.digital-keyboard-modal-2, &.digital-keyboard-modal-5, &.digital-keyboard-modal-3{
			padding-top: 180rpx;
			.dk-title{
				color: #333;
				font-size: 32rpx;
			}
			.digital-keyboard{
				width: 100%;
				position: fixed;
				bottom: 0;
				left: 0;
				position: fixed;
				left: 0;
				bottom: 0;
			}
		}

		.dk-title {
			font-size: 36rpx;
			font-weight: 800;
			color: #333333;
			line-height: 90rpx;
			text-align: center;
		}
		
		.dk-swiper{
			// height: 260rpx;
			height: 220rpx;
		}
		.top-bg-view {
			padding: 0 30rpx; display: flex; align-items: center; justify-content: space-between;
		}
		.dk-submit{
			position: absolute;
			right: 0;
			top: 0;
			padding: 0 20rpx;
			color: #38f;
			font-size: 28rpx;
			line-height: 70rpx;
		}
		
		.dk-return{
			right: auto;
			left: 0;
		}

		
		.dk-close{
			position: fixed;
			left: 30rpx;
			top: 30rpx;
		}

		.dk-subtitle {
			font-size: 24rpx;
			color: rgba(152, 152, 148, 1);
			line-height: 3;
			text-align: center;
		}
		
		.dk-down{
			text-align: center;
			line-height: 70rpx;
			box-shadow: 0 0 0 2rpx #eee;
			.dk-down-icon{
				border-left: 1px solid #bbb;
				border-bottom: 1px solid #bbb;
				width: 40rpx;
				height: 40rpx;
				display: inline-block;
				transform: scale(.5) rotate(-45deg);
			}
		}
		
		.pwd-tips{
			color: #666;
			font-size: 24rpx;
			line-height: 1.5;
			padding: 15rpx 100rpx;
		}
		
		.pwd-tips-errot{
			color: #ff4242;
			font-size: 30rpx;
			text-align: center;
		}
		
		.pwd-forget {
			font-size: 24rpx;
			color: #26C6B3;
			padding: 20rpx 0 30rpx;
			text-align: center;
			line-height: 33rpx;
			&.safe-view {
				padding: 30rpx 0 10rpx;
				color: #999;
			}
		}

		.digital-keyboard{
			box-shadow: 0 -1rpx 0 3rpx #eee;
			width: 100%;
			transition: all .2s linear;
			transform: translateY(100%);
		}
		
		/* 键盘 */
		.digital-key-box {
			box-shadow: 0 0 0 2rpx #eee;
			position: relative;
			overflow: hidden;
			width: 100%;
		}
		
		.digital-keyboard-show{
			transform: translateY(0);
		}

		.num {
			transition: all .2s linear;
			float: left;
			background-color: #fff;
			box-shadow: 0 0 0 2rpx #eee;
			width: 33.33333333%;
			cursor: pointer;
			height: 100rpx;
			text-align: center;
			color: #333;
			line-height: 100rpx;
			font-size: 55rpx;
			font-weight: bold;
			position: relative;
			overflow: hidden;
			&:after {
				content: "";
				display: block;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				pointer-events: none;
				//设置径向渐变
				// background-image: radial-gradient(circle, rgba(0, 0, 0, .65) 20%, transparent 20%);
				// background-repeat: no-repeat;
				// background-position: 50%;
				// transform: scale(5);
				// opacity: 0;
				// transition: transform .2s ease-in-out, opacity .3s ease-in-out;
			}
			&:active:after {
			    transform: scale(0);
			    opacity: .5;
			    //设置初始状态
			    transition: 0s;
			}
		}

		.num:nth-of-type(3n+1) {
			border-bottom: 0;
			border-left: 0;
		}

		.num:nth-of-type(3n+2) {
			border-bottom: 0;
			border-left: 0;
			border-right: 0;
		}

		.num.no-num {
			background-color: #f2f2f2;
			font-size: 0;
		}
		

		.num:last-child {
			background: #f2f2f2 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAilBMVEUAAADLy8vLy8vLy8vMzMzMzMzY2NjMzMzMzMzQ0NDOzs7MzMzMzMzNzc3Pz8/T09PMzMzNzc3Nzc3Nzc3Ly8vMzMzMzMzMzMzOzs7MzMzNzc3MzMzOzs7Ozs7Q0NDMzMzMzMzMzMzOzs7Ozs7Ly8vMzMzMzMzMzMzMzMzOzs7MzMzMzMzMzMzMzMzKmFAsAAAALXRSTlMAQICZ9vAD+uoMG+eyRCsHwV5RJfvhjEw2yGdWMiEX7NWjOhL83JKGeinNu3IVbGIkAAADJklEQVR42u2Z2XLiQAxFBY3xBhgw+2IWkxAg+v/fm6lJKgGBkbrHKl76PFJQOm7crWsZPB6Px+PxeDwej0dGsm/UzB7kZJMIFYiOCYhYz1GJcCCqP0Y9hsCSp6jIJgaGXoSqLLn6G9TlCE9ZbVAZA8+YBcigK7BvIYOuQIOpry3QDZFBV2DK1NcWmI6QQVdgyNTXFlgekEFXYCD8cTeG4Rafcl7GUDQjO4EFSggG399+tlsn7a+OVqlp3OuffvbrqLo+fBPP5QKfKKJxdcdgBR9XmS6UCnygiIhfs8NNq+0IBSYoFGDv2tEUrtnJBCYoZUYMuLR1Fgm8o5gOs3NJ3pyiRMCgBQ1ydoY3eZdcfy+QCOzQhqBHumcLf2gRu3WEvEB7h3ZEOclvwY/bDG4oxsgLtDtoS0rW4JQ+/jx5Q0aA1BcTrEilf1c6Tu68GAH7+pVrvUXcFnf/DC+QXdCNVhduiPv9WJAsqUDWR1dGZL9lmV2yNF/a6M7h98RxSZbmt1U6s4BKlshhnOvTruuYbIzN+cvkDqdkYaCoI/++wwOOKBJYYB3s4A6DMoEd1mPQBqfObuCCtdBpu402DPTrWgBKHskEOlgDxnm8ZuBdYxP8tmFeoIuodhCVc8na8ZruzSC7CAQaITLwDZkiz3mG6ZjWkaTs2T1pmf+cRqUnEoneaEyDZcgKuM/j0vz+vm/NgOZ1RsDdYLymO//hXbEPWAGYuRikyePBejglBqeIEXCbyganqsH6iBr0AkbAZS5N/+vVpjqqQvfACDhM5pfP4v9hKExHxvndRIfGf+Z87PMCkNsYJOThnAvLe0bA9v3QnAx22R6Vixr5WmzQvznsRnxYHjAC1u/o8qvrF+SEMmUErA3m5c3jF2dgxFkqkRpEs6+G28QnXArmGcFUBimeVjOG9p4JPZtjDpBNrNJk8Ya1so1s42yxRU14ASgZA2UB3kBfAMozMigLQMwYKAswgxt9AWZ0pS/ADO8UBF5mYMDNQF9APMLVGbCRIb4iC3itQZjAaw2OAC81OGcgMZigEiYGGeWwqcDnCjwej8fj8Xg8Ho/nL38AXRgT/6dxCesAAAAASUVORK5CYII=) center center / auto 50rpx no-repeat;
		}

		.pwd-box {
			padding-left: 10rpx;
			position: relative;
			text-align: center;
			margin-top: 20rpx;
		}

		.pwd-text {
			position: relative;
			line-height: 100rpx;
			vertical-align: middle;
			text-align: center;
			font-size: 50rpx;
			font-weight: bold;
			width: 82rpx;
			height: 82rpx;
			margin-right: 20rpx;
			display: inline-block;
			box-shadow: 0 0 0 3rpx #858585;
			overflow: hidden;
		}

		.pwd-text.active:after {
			-webkit-animation: twinkle 1s infinite;
			animation: twinkle 1s infinite;
			height: 70%;
			width: 4rpx;
			content: '';
			position: absolute;
			top: 15%;
			left: 50%;
			margin-left: -2rpx;
			background-color: #4fa5e1;
		}
		
		@keyframes twinkle {
			from {
				background-color: #4fa5e1;
			}

			to {
				background-color: transparent;
			}
		}
	}
</style>
