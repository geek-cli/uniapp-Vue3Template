<template>
	<view class="numBox">
		<view class="reduce" @click="change('-')" :class="{ disable: inputValue == minValue }">-</view>
		<input type="number" :maxlength="-1" v-model="inputValue"/>
		<view class="add" @click="change('+')" :class="{ disable: inputValue ==  maxValue }">+</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		inject,
		toRefs,
		watch,
		onMounted,
		nextTick
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

	let props = defineProps({
		// 宽
		width: {
			default: "180rpx",
		},
		// 高
		height: {
			default: "64rpx",
		},
		// 最大值为-1则可最大值为无限
		maxValue: {
			default: -1,
		},
		// 最小值
		minValue: {
			default: 1,
		},
		// 值
		modelValue: {
			default: 1
		},
		// 是否只可输入整数类型
		integer: {
			default: false,
			type: Boolean
		},
		// 步进
		step: {
			default: 1,
			type: Number
		},
		// 显示的小数位数 -1代表不限制小数位数
		decimalLength: {
			default: -1,
			type: Number
		}
	})
	let emit = defineEmits(['update:modelValue', 'max', 'min', 'change']);
	
	let inputValue = ref(null);
	
	onMounted(()=>{
		inputValue.value = props.modelValue;
		console.log(props.modelValue);
	})

	// 更改数量
	let change = (type) => {
		// 看步进是否有小数
		let valueArr = (props.step + '').split('.');
		// 保留小数长度
		let decimal = props.decimalLength != -1 ? props.decimalLength : valueArr.length > 1 ? valueArr[1].length : 0;
		// 值
		let value = inputValue.value * 1;
		if (type == "+") {
			if (props.maxValue == -1 || inputValue.value < props.maxValue) {
				value += props.step;
				inputValue.value = value.toFixed(decimal);
			}

		} else if (type == "-" && inputValue.value > props.minValue) {
			value -= props.step;
			inputValue.value = value.toFixed(decimal);
		}
		emit('update:modelValue', inputValue.value);
	}

	watch(()=>props.modelValue, v1=>{
		inputValue.value = v1;
	})
	
	watch(inputValue, v1=>{
		// 看步进是否有小数
		let valueArr = (props.step + '').split('.');
		// 保留小数长度
		let decimal = props.decimalLength != -1 ? props.decimalLength : valueArr.length > 1 ? valueArr[1].length : 0;
		if (v1 < props.minValue) {
			nextTick(()=>{
				inputValue.value = props.minValue.toFixed(decimal);
			})
		} else if (props.maxValue !== -1 && v1 > props.maxValue) {
			nextTick(()=>{
				inputValue.value = props.maxValue.toFixed(decimal);
			})
		} else if(props.integer){
			// // 检测是否包含.
			let index = (v1 + '').indexOf('.');
			if(index != -1) {
				nextTick(()=>{
					inputValue.value = v1.slice(0, index);
				})
			}
		}
		setTimeout(()=>{
			emit('update:modelValue', inputValue.value);
		}, 10)
	})
</script>

<style lang="less" scoped>
	.numBox {
		width: v-bind(width);
		height: v-bind(height);
		background: #FFFFFF;
		border: 3rpx solid #EEEFF1;
		border-radius: 10rpx;
		overflow: hidden;
		display: flex;
		align-content: center;
		text-align: center;

		.reduce,
		.add {
			width: 30%;
			line-height: v-bind(height);

			&.disable {
				color: #999999;
				background-color: #ededed;
			}
		}

		input {
			height: 100%;
			width: 40%;
			margin: 0;
			border-left: 3rpx solid #EEEFF1;
			border-right: 3rpx solid #EEEFF1;
		}
	}
</style>
