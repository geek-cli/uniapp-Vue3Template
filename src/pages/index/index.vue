<template>
	<view class="">
		<znx-layout>
			<uni-popup ref="popup" type="top"></uni-popup>
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
    const popup = ref(null)
    onReady(()=>{
        popup.value.open();
    })
</script>

<style lang="less" scoped>
	
</style>
