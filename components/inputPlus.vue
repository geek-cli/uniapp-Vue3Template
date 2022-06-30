<template>
	<view class="inputPlus" :class="{border: isBorder}" :style="{height, paddingLeft: !title ? '16rpx' : '', backgroundColor }">
		<view class="title" v-if="title">
			{{title}}
		</view>
		<input 
			:type="useInputType" 
			:placeholder="inputPlaceholder" 
			 placeholder-class="input" 
			:placeholder-style="placeholderStyle"
			:maxlength="length"
			:disabled="disable"
			:value="modelValue"
			@input="e=>emit('update:modelValue', e.detail.value)"
		/>
		<!-- 验证码 -->
		<view class="code" v-if="type == 'code'" @click="sendCode">
			<view class="text" v-if="!isSendCode">
				{{codeText}}
			</view>
			<view class="timer" v-else>{{timer}}</view>
		</view>
		<!-- 密码框 -->
		<image @click="useInputType = useInputType == 'password' ? inputType : 'password'" v-if="type === 'password'" class="eye" :src="useInputType === 'password' ? '../../static/closeEye.png' : '../../static/openEye.png'" mode=""></image>
	</view>
</template>

<script setup>
	import { ref, reactive, getCurrentInstance } from "vue";
	let props = defineProps({
		// 标题
		title: {
			default: ""
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
			default: 3
		},
		height: {
			default: "91rpx"
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
			default: ""
		},
		// 当类型为code时展示的字
		codeText: {
			default: "获取验证码"
		},
		// 输入框内容
		modelValue: {
			default: ""
		}
	})
	
	let emit = defineEmits(['code', "update:modelValue"])
	
	// 使用的input类型
	let useInputType = ref(props.type === 'password' ? 'password' : props.inputType);
	
	// 是否已经发送验证码
	let isSendCode = ref(false);
	// 倒计时长
	let timer = ref(props.timer);
	// 发送验证码
	let sendCode = ()=>{
		if(!isSendCode.value) {
			isSendCode.value = true;
			let time = setInterval(()=>{
				// 判断是否倒计时结束
				if(timer.value <= 1) {
					// 重置时间
					timer.value = props.timer;
					isSendCode.value = false;
					clearInterval(time);
				} else {
					timer.value--;
				}
			}, 1000)
			// 执行发送code时间
			emit('code');
		}
	}
</script>

<style lang="less" scoped>
	.inputPlus {
		display: flex;
		align-items: center;
		height: 97rpx;
		padding-right: 20%;
		position: relative;
		&.border {
			border-bottom: 1rpx solid #f1f1f1;
		}
		.title {
			margin-right: 46rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			min-width: 20%;
			line-height: 1;
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
		.code, .eye {
			position: absolute;
		}
	}
</style>