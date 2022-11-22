<template>
	<view class="tabbar">
		<view class="content">
			<view class="tabbar-item" v-for="(item, index) in tabbar" :key="index"
				:style="{width: `${750/tabbar.length}rpx`}" @click="selectTab(item.id)">
				<view>
					<view class="img relative">
						<image v-if="ident === item.id" :src="$Common.img(item.iconAct)" mode="aspectFit"></image>
						<image v-else :src="$Common.img(item.icon)" mode="aspectFit"></image>
					</view>
					<view :class="ident === item.id ? 'act' : ''">{{item.text}}</view>
				</view>
			</view>
		</view>
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
	// 组件参数
	let props = defineProps({
		ident: {
			default: ""
		}
	})
	// 变量
	let tabbar = reactive([
		// {
		// 	text: '首页',
		// 	icon: "tabbar/icon1.png",
		// 	iconAct: "tabbar/icon1Act.png",
		// 	to: '/pages/index/index',
		// 	id: "home",
		// 	isLogin: false
		// },
	]);
	// 切换导航栏
	let selectTab = (id) => {
		// 跳转项
		let item = tabbar.filter(tab => tab.id == id)[0];
		// 判断需要登陆的地方是否登录
		if (item.isLogin && (!uni.getStorageSync('user') || !uni.getStorageSync('token'))) {
			return uni.navigateTo({
				url: '' // 这里填写登录页地址
			});
		}
		if (props.ident === id) return;
		// 	// 跳转
		uni.reLaunch({
			url: item.to
		});
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
			box-shadow: 0 -2rpx 12rpx 0 rgba(0, 0, 0, 0.08);
		}

		.tabbar-item {
			display: flex;
			justify-content: center;

			&:nth-child(4) {
				>view {
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
				color: #35CB60;
			}
		}
	}
</style>
