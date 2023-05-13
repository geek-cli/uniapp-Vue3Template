<template>
	<view class="">
		
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		inject,
		toRefs,
		watch
	} from "vue";
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app';
	// 获取全局对象
	const global = inject('global');
	// 解构需要使用的部分
	const {
		$Common,
		$api
	} = global;

	let commonBox = ref(null);
	let pwd = ref('');
	let list = ref([{
			name: "jerry"
		},
		{
			name: "join"
		},
		{
			name: "mac"
		}
	])
</script>

<style lang="less" scoped>
	.grid {
		view {
			background-color: red;
		}
	}
</style>