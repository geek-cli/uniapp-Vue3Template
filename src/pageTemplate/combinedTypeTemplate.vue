<template>
	<view class="">
		<w-layout>
			
		</w-layout>
	</view>
</template>

<script setup>
	import { ref, reactive, inject, toRefs, watch } from "vue";
	import { onLoad } from '@dcloudio/uni-app';
	// 获取全局对象
	const global = inject('global');
	// 解构需要使用的部分
	const { $Common, $api } = global;
</script>

<style lang="less" scoped>
	
</style>
