<template>
	<view class="btn" :style="{
		width,
		height,
		borderRadius: isRadius ? '44rpx' : ''
	}" @click="emit('click')" :class="type">
		{{text}}
	</view>
</template>

<script setup>
	import { ref, reactive } from "vue";
	let props = defineProps({
		text: {
			default: ""
		},
		height: {
			default: "88rpx"
		},
		width: {
			default: "690rpx"
		},
		isRadius: {
			default: true
		},
		// 可选值为common1、common2、common3
		type: {
			default: "common1"
		}
	})
	let emit = defineEmits(['click'])
</script>

<style lang="less" scoped>
	.btn {
		font-size: 28rpx;
		font-weight: 500;
		text-align: center;
		margin: 0 auto;
		box-sizing: border-box;
		line-height: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		&.common1 {
			background: linear-gradient(80deg, #EE7457 0%, #F02F00 100%);
			color: #FFFFFF;
		}
		&.common2 {
			color: #666666;
			background: #fff;
		}
		&.common3 {
			background: #FFFFFF;
			border: 1rpx solid @common;
			border-radius: 34rpx;
			color: @common;
		}
	}
</style>