<template>
	<view class="tabbar" @click="selectTab">
		<view class="content">
			<view class="tabbar-item" v-for="(item, index) in tabbar" :key="index" :style="{width: `${750/tabbar.length}rpx`}">
				<view>
					<view class="img relative">
						<image v-if="id === index " :src="item.iconAct" mode="aspectFit" :data-id="item.id"></image>
						<image v-else :src="item.icon" mode="aspectFit" :data-id="item.id"></image>
					</view>
					<view :data-id="item.id" :class="id === item.id ? 'act' : ''">{{item.text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from "vue";
	// 组件参数
	let props = defineProps({
		id: {
			default: ""
		}
	})
	// 变量
	let tabbar = reactive([
		{
			text: '首页',
			icon: "/static/tabbar/home.png",
			iconAct: "/static/tabbar/homeAct.png",
			to: '/pages/index/index',
			id: "home"
		}
	]);
	// 切换导航栏
	let selectTab = (e)=>{
		let data = e.target.dataset;
		if(data.id) {
			if(props.id === data.id) return;
			// 找出要跳转的向
			let to = tabbar.filter(tab=>tab.id == data.id)[0].to; 
			// 跳转
			uni.reLaunch({
				url: to
			});
		}
	}
</script>

<style lang="less">
	.tabbar {
		height: 98rpx;
		height: calc(98rpx + constant(safe-area-inset-bottom));
		height: calc(98rpx + env(safe-area-inset-bottom));
		padding-top: calc(98rpx + 20rpx);
		padding-top: calc(98rpx + constant(safe-area-inset-bottom) + 20rpx);
		padding-top: calc(98rpx + env(safe-area-inset-bottom) + 20rpx);
		.redDot {
			right: -10rpx;
			border-radius: 50%;
			background-color: red;
			top: -10rpx;
			font-size: 22rpx;
			color: #fff;
			min-width: 40rpx;
			max-width: 70rpx;
			min-height: 40rpx;
			max-height: 70rpx;
			line-height: 1;
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.content {
			width: 100%;
			position: fixed;
			display: flex;
			bottom: 0;
			left: 0;
			justify-content: center;
			background-color: #fff;
			box-shadow: 0px -2px 12px 0px rgba(0, 0, 0, 0.08);
		}
		.tabbar-item {
			display: flex;
			justify-content: center;
			&:nth-child(4) {
				> view {
					image {
						position: relative;
						left: -6rpx;
					}
				}
			}
			>view {
				image {
					width: 52rpx;
					height: 52rpx;
				}
				color: rgba(153, 153, 153, 1);
				font-size: 24rpx;
				padding: 15rpx 0;
				text-align: center;
				font-weight: 500;
			}
			.act {
				color: rgba(51, 51, 51, 1);
			}
		}
	}
</style>
