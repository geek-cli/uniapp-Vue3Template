<template>
	<view class="">
		<geek-sku :select-sku-index="selectSkuIndex" v-model="skuShow" :data="skus" :themeColor="[226, 35, 26]"
			defaultCover="https://img-blog.csdnimg.cn/img_convert/587467738dfa4de190a7cd9818ca59fb.jpeg"
			:isShowStock="false" @skuChange="skuChange" btnConfirmText="购买" notSelectSku="请选择完整的商品信息"
			@confirm="skuConfirm" notStockDisabled></geek-sku>
		<!-- 打开sku组件 -->
		<button @click="skuShow = !skuShow">打开sku</button>
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


	let skuShow = ref(false);
	let skus = ref([
		{
				id: 1,
				price: 7000,
				stock: 30,
				sku_attrs: {
					'机身颜色': '深空黑色',
					'储存容量': '128G',
					'套装': '快充套装'
				}
			},
			{
				id: 2,
				price: 8500,
				stock: 0,
				sku_attrs: {
					'机身颜色': '暗紫色',
					'储存容量': '256G',
					'套装': '快充套装'
				}
			},
			{
				id: 6,
				price: 9500,
				stock: 10,
				sku_attrs: {
					'机身颜色': '暗紫色',
					'储存容量': '512G',
					'套装': '快充套装'
				}
			},
			{
				id: 3,
				price: 9500,
				stock: 0,
				sku_attrs: {
					'机身颜色': '暗紫色',
					'储存容量': '512G',
					'套装': 'AirPods套装'
				}
			},
			{
				id: 7,
				price: 9500,
				stock: 0,
				sku_attrs: {
					'机身颜色': '暗紫色',
					'储存容量': '1TB',
					'套装': '快充套装'
				}
			},
			{
				id: 4,
				price: 9200,
				stock: 60,
				sku_attrs: {
					'机身颜色': '银色',
					'储存容量': '512G',
					'套装': 'AirPods套装'
				}
			},
			{
				id: 5,
				price: 9200,
				stock: 80,
				sku_attrs: {
					'机身颜色': '金色',
					'储存容量': '512G',
					'套装': 'AirPods3套装'
				}
			},
			{
				id: 6,
				price: 9200,
				stock: 0,
				sku_attrs: {
					'机身颜色': '金色',
					'储存容量': '512G',
					'套装': '快充套装'
				}
			}
	])
	
	let selectSkuIndex = ref(0);	
	
	let skuConfirm = ()=>{
		
	}
	let skuChange = ()=>{
		
	}
</script>

<style lang="less" scoped>
	.grid {
		view {
			background-color: red;
		}
	}
</style>