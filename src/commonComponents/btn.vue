<template>
	<view class="btn" :style="{
		width,
		height,
		borderRadius: isRadius ? '43rpx' : ''
	}" @click="trigger" :class="type">
		<slot>
			按钮
		</slot>
	</view>
</template>

<script setup>
	/**
	 * btn
	 * @description 这是一个带有节流、防抖、基本样式的按钮。
	 * @property {String} height 高度。
	 * @property {String} width 宽度。
	 * @property {Boolean} isRadius 是否有圆角(默认值: true)。
	 * @property {String} type 类型(默认值: common1), 需要自定义类型, 请在组件样式内添加相应的class样式。
	 * @property {String} limit 是否使用节流或防抖(默认值: false), 可选值: ["debounce", "throttle"]。
	 * @example <btn>内容</btn>
	 */
	import { ref, reactive } from "vue";
	let props = defineProps({
		height: {
			default: "86rpx"
		},
		width: {
			default: "100%"
		},
		isRadius: {
			default: true,
			type: Boolean
		},
		// 可选值为common1、common2
		type: {
			default: "common1"
		},
		// 是否使用节流或防抖
		limit: {
			// 默认不适用
			default: ""
		}
	})
	// 组件自定义事件
	let emit = defineEmits(['click']);
	
	// 定时器
	let timer = null;
	// 开始的时间
	let prev = null;
	
	// 防抖
	let debounce = (fn, wait)=>{
		if(timer !== null) clearTimeout(timer);
		timer = setTimeout(fn, wait);
	}
	// 节流
	let throttle = (fn, wait)=>{
		var now = Date.now();
		if (now - prev >= wait) {
			prev = Date.now();
			fn();
		}
	}
	
	// 触发点击按钮事件
	let trigger = ()=>{
		if(!props.limit) {
			emit("click")
		} else {
			switch(props.limit) {
				case "debounce":
					debounce(()=>emit("click"), 1000);
					break;
				case "throttle":
					throttle(()=>emit("click"), 1000);
					break;
			}
		}
	}
</script>

<style lang="less" scoped>
	.btn {
		font-size: 32rpx;
		font-weight: 500;
		text-align: center;
		box-sizing: border-box;
		line-height: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		&.common1 {
			background: #54A4FF;
			color: #FFFFFF;
		}
		&.common2 {
			color: #999999;
			background: #EEEEEE;
		}
	}
</style>