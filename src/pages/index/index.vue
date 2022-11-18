<template>
	<view class="">
		<znx-layout>
			<znx-numBox :maxValue="12" width="500rpx"></znx-numBox>
		</znx-layout>
	</view>
</template>

<script setup>
	import { ref, reactive, inject, toRefs, watch } from "vue";
	import { onLoad, onReady } from '@dcloudio/uni-app';
	// 获取全局对象
	const global = inject('global');
	// 解构需要使用的部分
	const { $Common, $api } = global;
</script>

<style lang="less" scoped>
	page {
		margin-top: 100rpx;
		margin-left: 100rpx;
	}
</style>
