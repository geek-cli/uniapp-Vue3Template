<template>
	<view class="Layout">
		<slot></slot>
	</view>
</template>

<script setup>
	/**
	 * Layout
	 * @description 这是一个容器，用来存放页面内所有视图层的内容，可以方便后期拓展时添加全局内容。
	 * @example <Layout :value="flowList"></Layout>
	 */
	import { ref, reactive, inject, toRefs } from "vue";
	import { onLoad } from '@dcloudio/uni-app';
	// 获取全局对象
	const global = inject('global');
	// 解构需要使用的部分
	const { $Common, $api } = global;
</script>

<style lang="less" scoped>
	.Layout {
		
    }
</style>
