<template>
	<view class="inputPlus">
		<view class="title" v-if="title && titleShowType == 'block'" :style="{
			marginBottom: border == 'surround' ? '20rpx' : '',
		}">
			{{title}}
		</view>
		<view class="container" :class="{bottom: border == 'bottom'}">
			<view class="title" v-if="title && titleShowType == 'line'">
				{{title}}
			</view>
			<view class="inputBox" :class="[border]" :style="{
				height, 
				backgroundColor
			}">
				<!-- 输入框前置内容 -->
				<slot name="prefix"></slot>
				<input :type="useInputType" :placeholder="placeholder" placeholder-class="input"
					:placeholder-style="placeholderStyle" :maxlength="length" :disabled="disabled" :value="modelValue"
					@input="e=>emit('update:modelValue', e.detail.value)" />
				<!-- 验证码 -->
				<view class="code" v-if="type == 'code'" @click="sendCode">
					<view class="text" v-if="!isSendCode">
						{{codeText}}
					</view>
					<view class="timer" v-else>重新发送({{countdownTimer}})</view>
				</view>
				<!-- 密码框 -->
				<template v-if="type === 'password' && passwordIcon">
					<image v-if="useInputType === 'password'" @click="useInputType = 'text'" class="eye"
						src="../img/closeEye.png" mode="">
					</image>
					<image v-else @click="useInputType = 'password'" class="eye" src="../img/openEye.png" mode="">
					</image>
				</template>
				<!-- 输入框后置内容 -->
				<slot name="suffix"></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
	/**
	 * inputPlus 输入框增强
	 * @description 输入框增加版，可以发送验证码、带眼睛的密码框、带标题的输入框、自定义右边内容的输入框。
	 * @property {String} title 标题。
	 * @property {String} titleShowType 标题的展现方式(默认值: line)。
	 *  @value line 行显示。
	 *  @value block 块显示。
	 * @property {String} type 输入框类型(默认值: text)。
	 *  @value text 普通文本输入框
	 *  @value number 数字输入框
	 *  @value password 密码输入框
	 *  @value code 验证码输入框
	 *  @value digit 带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序。
	 *  @value idcard 身份证输入键盘，微信、支付宝、百度、QQ小程序。
	 * @property {Boolean} passwordIcon 是否显示小眼睛图标(默认值: true)。
	 * @property {String} border 边框类型(默认值: none)。
	 *  @value surround 四周边框
	 *  @value bottom 边框类型
	 *  @value none 不边框
	 * @property {Object} placeholderStyle 占位符样式(字符串样式)。
	 * @property {String} length 输入框文本长度(默认值: -1)，-1为不限长度。
	 * @property {Number} timer 倒计时长(默认: 60s)。
	 * @property {String} height 组件高度。
	 * @property {Boolean} disabled 组件是否禁用(默认: false)。
	 * @property {String} placeholder 输入框占位符。
	 * @property {String} codeText type为code时,展示的发送验证的文本描述。
	 * @property {String | Number} modelValue 输入框值。
	 * @property {Boolean | Number} isCanSendCode type为code时,是否可以发送验证码。
	 * @property {String} isOpenTheCountdown type为code时,是否开启倒计时。
	 * @event {Function()} code type为code时,点击获取验证码文字触发的事件。
	 * @example <inputPlus title="标题" v-model="modelValue"></inputPlus>
	 */
	import {
		ref,
		reactive,
		inject,
		toRefs,
		watch
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app';
	// 获取全局对象
	const global = inject('global');
	// 解构需要使用的部分
	const {
		$Common,
		$api
	} = global;

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
		// 输入框类型
		type: {
			default: "text"
		},
		// 是否显示小眼睛图标
		passwordIcon: {
			default: true,
			type: Boolean
		},
		// 边框类型
		border: {
			default: 'none',
			type: String
		},
		// 占位符样式
		placeholderStyle: {
			default: '',
			type: String
		},
		// 输入框长度
		length: {
			default: -1
		},
		// 倒计时长
		timer: {
			default: 60
		},
		// 组件高度
		height: {
			default: "94rpx"
		},
		// 背景色
		backgroundColor: {
			default: "rgba(0, 0, 0, 0)"
		},
		// 是否禁用
		disabled: {
			default: false,
			type: Boolean
		},
		// 输入框占位符
		placeholder: {
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
			type: [Boolean, Number]
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
	let useInputType = $ref(props.type);
	// 是否已经发送验证码
	let isSendCode = $ref(false);
	// 倒计时时长
	let countdownTimer = $ref(props.timer);

	// 发送验证码
	let sendCode = () => {
		if (props.isCanSendCode) {
			if (!isSendCode) {
				// 执行发送code时间
				emit('code');
			}
		} else {
			$Common.commonToast(props.noCanSendCodeText)
		}
	}

	// 监听是否开启倒计时
	watch(() => props.isOpenTheCountdown, (newValue) => {
		// 如果为开启倒计时
		if (newValue && !isSendCode) {
			// 修改验证码状态
			isSendCode = true;
			// 增加倒计时
			let time = setInterval(() => {
				// 判断是否倒计时结束
				if (countdownTimer <= 1) {
					// 重置时间
					countdownTimer = props.timer;
					isSendCode = false;
					clearInterval(time);
				} else {
					countdownTimer--;
				}
			}, 1000)
		}
	})
</script>

<style lang="less" scoped>
	.inputPlus {
		&.border {
			border-bottom: 1rpx solid #EEEFF1;
		}

		.title {
			font-size: 32rpx;
			font-weight: 400;
			color: #999999;
		}

		.container {
			display: flex;
			align-items: center;
			position: relative;
			
			&.bottom {
				border-bottom: 1rpx solid #cdcfd6;
			}

			.inputBox {
				flex: 1;
				flex-shrink: 0;
				display: flex;
				align-items: center;

				&.surround,
				&.bottom {
					border-radius: 10rpx;
				}

				&.surround {
					padding: 0 20rpx;
					border: 1rpx solid #cdcfd6;
				}

				input {
					flex: 1;
					font-size: 32rpx;
					font-weight: 400;
				}

				.input {
					color: #DDDDDD;
				}

				.eye {
					width: 32rpx;
					height: 32rpx;
				}

				.code {
					font-size: 26rpx;
					font-weight: bold;
					color: #1395F3;
				}

				.code,
				.eye {
					margin-left: 30rpx;
				}
			}

			.title {
				margin-right: 30rpx;
				min-width: 15%;
			}
		}
	}
</style>
