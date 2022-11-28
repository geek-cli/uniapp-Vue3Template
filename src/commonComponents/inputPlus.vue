<template>
	<view class="inputPlus" :class="{border: isBorder}">
		<view class="title" v-if="title && titleShowType == 'block'">
			{{title}}
		</view>
		<view class="container" :style="{
			height, 
			backgroundColor, 
			paddingRight: '20%' 
		}">
			<view class="title" v-if="title && titleShowType == 'line'">
				{{title}}
			</view>
			<input :type="useInputType" :placeholder="inputPlaceholder" placeholder-class="input"
				:placeholder-style="placeholderStyle" :maxlength="length" :disabled="disable" :value="modelValue"
				@input="e=>emit('update:modelValue', e.detail.value)" />
			<!-- 验证码 -->
			<view class="code" v-if="type == 'code'" @click="sendCode">
				<view class="text" v-if="!isSendCode">
					{{codeText}}
				</view>
				<view class="timer" v-else>重新发送({{countdownTimer}})</view>
			</view>
			<!-- 密码框 -->
			<image @click="useInputType = useInputType == 'password' ? inputType : 'password'"
				v-if="type === 'password'" class="eye"
				:src="useInputType === 'password' ? $Common.img('/input/closeEye.png') : $Common.img('/input/openEye.png')" mode="">
			</image>
			<!-- 自定义右边内容 -->
			<view class="rightDiy">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
	/**
	 * inputPlus 输入框增强
	 * @description 输入框增加版，可以发送验证码、带眼睛的密码框、带标题的输入框、自定义右边内容的输入框。
	 * @property {String} title 用于渲染的数据
	 * @property {String} titleShowType 标题的展现方式(默认值: line)
	 * @property {String} inputType 输入框类型(默认值: text)
	 * @property {String} type 组件类型(默认值: common)
	 * @property {Boolean} isBorder 是否有边框线(默认值: true)
	 * @property {Null} placeholderStyle 占位符样式
	 * @property {String} length 输入框文本长度(默认值: -1)，-1为不限长度
	 * @property {Number} timer 倒计时长(默认: 60s)
	 * @property {String} height 组件高度
	 * @property {Boolean} disabled 组件是否禁用(默认: false)
	 * @property {String} inputPlaceholder 输入框占位符
	 * @property {String} codeText type为code时,展示的发送验证的文本描述
	 * @property {String, Number} modelValue 输入框值
	 * @property {String} isCanSendCode type为code时,用来判断是否可以发送验证码
	 * @property {String} isOpenTheCountdown type为code时,是否开启倒计时
	 * @example <inputPlus title="标题" v-model="modelValue"></inputPlus>
	 */
	import { ref, reactive, inject, toRefs, watch } from "vue";
	import { onLoad } from '@dcloudio/uni-app';
	// 获取全局对象
	const global = inject('global');
	// 解构需要使用的部分
	const { $Common, $api } = global;
	
	// 组件参数
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
			default: true,
			type: Boolean
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
			default: "94rpx"
		},
		backgroundColor: {
			default: "rgba(0, 0, 0, 0)"
		},
		// 是否禁用
		disabled: {
			default: false,
			type: Boolean
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
			default: false,
			type: Boolean
		},
		// 不可发送验证码的提示语
		noCanSendCodeText: {
			default: "请输入正确的手机号"
		},
		// 是否开启倒计时
		isOpenTheCountdown: {
			default: false,
			type: Boolean
		}
	})
	
	// 组件自定义事件
	let emit = defineEmits(["code", "update:modelValue"])
	
	// 使用的input类型
	let useInputType = ref(props.type == 'password' ? 'password' : props.inputType);
	// 是否已经发送验证码
	let isSendCode = ref(false);
	// 倒计时时长
	let countdownTimer = ref(props.timer);
	
	// 发送验证码
	let sendCode = ()=>{
		if (props.isCanSendCode) {
			if (!isSendCode.value) {
				// 执行发送code时间
				emit('code');
			}
		} else {
			$Common.commonToast(props.noCanSendCodeText)
		}
	}
	
	// 监听是否开启倒计时
	watch(()=> props.isOpenTheCountdown, (newValue)=>{
		// 如果为开启倒计时
		if (newValue && !isSendCode.value) {
			// 修改验证码状态
			isSendCode.value = true;
			// 增加倒计时
			let time = setInterval(() => {
				// 判断是否倒计时结束
				if (countdownTimer.value <= 1) {
					// 重置时间
					countdownTimer.value = props.timer;
					isSendCode.value = false;
					clearInterval(time);
				} else {
					countdownTimer.value--;
				}
			}, 1000)
		}
	})
</script>

<style lang="less" scoped>
	.inputPlus {
		&.border {
			border-bottom: 1rpx solid #EEEEEE;
		}

		.title {
			color: #333333;
		}

		.container {
			display: flex;
			align-items: center;
			position: relative;

			.title {
				margin-right: 30rpx;
				min-width: 20%;
			}

			input {
				font-size: 26rpx;
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
				right: 0;
			}

			.code {
				right: 0;
				font-size: 26rpx;
				font-weight: bold;
				color: #1395F3;
			}

			.rightDiy {
				right: 0;
			}

			.code,
			.eye,
			.rightDiy {
				position: absolute;
			}
		}
	}
</style>
