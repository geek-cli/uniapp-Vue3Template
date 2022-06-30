<template>
	<view class="">
		<Layout>
			
		</Layout>
	</view>
</template>

<script setup>
	import { ref, reactive, inject, toRefs } from "vue";
	import { onLoad } from '@dcloudio/uni-app';
	// 获取全局对象
	const global = inject('global');
	// 常用方法
	const $Common = global.$Common;
	// api
	const $api = global.$api;
</script>

<style lang="less" scoped>
	
</style>
