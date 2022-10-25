<template>
	<view class="inputPlus" :class="{border: isBorder}">
		<view class="title" v-if="title && titleShowType == 'block'">
			{{title}}
		</view>
		<view class="container" 
		:style="{
			height, 
			paddingLeft: !title ? '16rpx' : '', 
			backgroundColor, 
			paddingRight: '20%' 
		}">
			<view class="title" v-if="title && titleShowType == 'line'">
				{{title}}
			</view>
			<input :type="useInputType" :placeholder="inputPlaceholder" placeholder-class="input"
				:placeholder-style="placeholderStyle" :maxlength="length" :disabled="disable" :value="modelValue"
				@input="e=>$emit('input', e.detail.value)" />
			<!-- 验证码 -->
			<view class="code" v-if="type == 'code'" @click="sendCode">
				<view class="text" v-if="!isSendCode">
					{{codeText}}
				</view>
				<view class="timer" v-else>{{countdownTimer}}</view>
			</view>
			<!-- 密码框 -->
			<image @click="useInputType = useInputType == 'password' ? inputType : 'password'"
				v-if="type === 'password'" class="eye"
				:src="useInputType === 'password' ? '../../static/closeEye.png' : '../../static/openEye.png'" mode="">
			</image>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, inject, watch } from "vue";
	import { onLoad } from '@dcloudio/uni-app';
	// 获取全局对象
	const global = inject('global');
	// 常用方法
	const $Common = global.$Common;
	// api
	const $api = global.$api;
	
	let props = defineProps({
		// 标题
		title: {
			default: ""
		},
		// 标题的展示方式
		titleShowType: {
			// 两种类型 line 和 block
			default: "line"
		},
		// 输入框占位符
		inputPlus: {
			default: ""
		},
		// 输入框类型
		inputType: {
			default: "text"
		},
		// inputPlus 组件类型
		type: {
			default: "common"
		},
		// 是否有边框线
		isBorder: {
			default: true
		},
		// 占位符样式
		placeholderStyle: {
			default: null
		},
		// 输入框长度
		length: {
			default: -1
		},
		// 倒计时长
		timer: {
			default: 60
		},
		height: {
			default: "60rpx"
		},
		backgroundColor: {
			default: "rgba(0, 0, 0, 0)"
		},
		// 是否禁用
		disable: {
			default: false
		},
		// 输入框占位符
		inputPlaceholder: {
			default: "请输入文本内容"
		},
		// 当类型为code时展示的字
		codeText: {
			default: "获取验证码"
		},
		// 输入框内容
		modelValue: {
			default: ""
		},
		// 是否可以发送验证码
		isCanSendCode: {
			default: false
		},
		// 不可发送验证码的提示语
		noCanSendCodeText: {
			default: "请输入正确的手机号"
		}
	})
	
	let emit = defineEmits(['code', "update:modelValue"])
	
	// 使用的input类型
	let useInputType = ref(props.type === 'password' ? 'password' : props.inputType);
	
	// 是否已经发送验证码
	let isSendCode = ref(false);
	// 倒计时长
	let countdownTimer = ref(props.timer);
	// 发送验证码
	let sendCode = ()=>{
		if(props.isCanSendCode) {
			if(!isSendCode.value) {
				// 修改验证码状态
				isSendCode.value = true;
				// 执行发送code时间
				emit('code');
				// 增加倒计时
				let time = setInterval(()=>{
					// 判断是否倒计时结束
					if(countdownTimer.value <= 1) {
						// 重置时间
						countdownTimer.value = props.timer;
						isSendCode.value = false;
						clearInterval(time);
					} else {
						countdownTimer.value--;
					}
				}, 1000)
			}
		} else {
			$Common.commonToast(props.noCanSendCodeText)
		}
	}
</script>

<style lang="less" scoped>
	.inputPlus {
		padding-bottom: 10rpx;
		&.border {
			border-bottom: 1rpx solid #333;
		}
		.title {
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			line-height: 1;
		}
		.container {
			display: flex;
			align-items: center;
			position: relative;		
			.title {
				margin-right: 46rpx;
				min-width: 20%;
			}
			
			input {
				font-size: 24rpx;
				font-weight: 500;
				flex: 1;
				margin-right: 40rpx;
			}
			
			.input {
				color: #999999;
			}
			
			.eye {
				width: 32rpx;
				height: 32rpx;
				right: 47rpx;
			}
			
			.code {
				right: 0;
				color: #F03000;
			
				.text {
					padding: 12rpx 15rpx;
					font-size: 18rpx;
					font-weight: 500;
					border: 4rpx solid #F03000;
					border-radius: 50rpx;
					line-height: 1;
				}
			}
			
			.code,
			.eye {
				position: absolute;
			}
		}
	}
</style>