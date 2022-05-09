<template>
	<view class="content">
		<view class="flex">
			<view>213</view>
			<view>321</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from "@dcloudio/uni-app";
	import { getCurrentInstance } from "vue";
	let $api = getCurrentInstance().appContext.config.globalProperties.$api;
	onLoad(()=>{
		$api.indexProjectList().then((res)=>{
			console.log(res);
		})
	})
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
