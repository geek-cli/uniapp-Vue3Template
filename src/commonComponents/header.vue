<template>
	<view class="Header-box">
		<view class="header-fixed-box" :style="{
                background: noBg ? noBg : '#fff'
            }">
			<view class="header-main-box">
				<view v-if="!noLeft" @click="headerLeftClick" class="header-left-box header-operation">
					<slot name="left">
						<image v-if="whiteback" class="header-left-back" mode="widthFix"
						src="@/static/img/header/icon-back-white.png" />
						<image v-else class="header-left-back" mode="widthFix" src="@/static/img/header/blackLeft.png" />
					</slot>
				</view>
				<view class="header-title" :style="{color: titlecolor ? titlecolor :' #333333'}">{{ pageTitle }}</view>
				<view @click="headerRightClick" :style="{paddingRight: rightPadding ? rightPadding : '',color: rightColor ? rightColor + '!important' : ''}" class="header-right-box header-operation">
					<slot name="right">
						{{ rightText }}
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	/**
	 * header 页面标题
	 * @description 自定义页面标题
	 * @property {String} rightText 右侧文字(默认值："")，如果需要自定义右侧内容则可以使用名为right的具名插槽。
	 * @property {Boolean String} noBg 是否有背景色(默认值：false)。
	 * @property {Boolean String} titlecolor 是否有标题颜色(默认值：false)
	 * @property {Boolean} whiteback 是否有白色左侧箭头(默认值: false)即默认黑色左侧箭头。
	 * @property {Boolean} noLeft 是否没有返回(默认值: false),如果为true则不会出现返回箭头。
	 * @property {String} notitle 页面标题(默认值:"")，如果不设置页面标题则会默认读取pages.json中相应页面的title属性。
	 * @property {String} rightPadding 右侧padding(默认值: "30rpx")。
	 * @property {String Boolean} rightColor 右侧字体颜色(默认值: false)。
	 * @property {Boolean} leftClick 是否有左侧自定义返回事件(默认值: false)
	 * @example <header notitle="页面标题"></header>
	 */
	import pages from "@/pages.json";
	import { toRefs, ref, onMounted, watch } from "vue";
	let props = defineProps({
		// 右侧文字
		rightText: {
			default: "",
		},
		// 是否有背景色
		noBg: {
			default: false,
		},
		//是否有标题颜色
		titlecolor: {
			default: false,
		},
		//是否有白色左侧箭头
		whiteback: {
			default: false,
		},
		// 是否没有返回
		noLeft: {
			default: false,
			type: Boolean
		},
		notitle: {
			default: false,
		},
		// 右侧padding
		rightPadding: {
			default: '30rpx'
		},
		// 右侧颜色
		rightColor:{
			default: false
		},
		// 是否有左侧自定义返回事件
		leftClick: {
			default: false,
			type: Boolean
		}
	})
	
	let emit = defineEmits(['leftClick', 'rightClick']);
	
	let pageTitle = ref("");
	
	// 组件创建时
	onMounted(()=>{
		// 获取当前页面路由标题
		if (props.notitle) {
			pageTitle.value = props.notitle;
		} else {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let url = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
			let page = pages.pages.filter(page=> page.path == url)[0]; // 通过过滤找出当前页面
			let title = page.title; // 获取当前页面标题
			pageTitle.value = title; // 赋值标题
		}
	})
	
	// 监听标题变化
	watch(()=>props.notitle, (n)=>{
		pageTitle.value = n;
	});
	
	let headerRightClick = ()=>{
		// 组件绑定click事件
		emit("rightClick");
	}
	// 返回事件
	let headerLeftClick = () =>{
		if(props.leftClick) {
			emit("leftClick")
		} else {
			// #ifndef H5
			uni.navigateBack();
			// #endif
			// #ifdef H5
			history.back();
			// #endif
		}
	}
</script>

<style lang="less" scoped>
	.Header-box {
		position: relative;
		padding-bottom: @headerheight;
		padding-bottom: calc(constant(safe-area-inset-top) + @headerheight);
		padding-bottom: calc(env(safe-area-inset-top) + @headerheight);

		.header-fixed-box {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: @headerheight;
			height: calc(constant(safe-area-inset-top) + @headerheight);
			height: calc(env(safe-area-inset-top) + @headerheight);
			z-index: 9;
			background: rgba(255, 255, 255, 0);
			background-color: #fff;

			.header-main-box {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				text-align: center;
				height: calc(@headerheight - constant(safe-area-inset-top));
				height: calc(@headerheight - env(safe-area-inset-top));
				height: @headerheight;
				color: white;

				.header-title {
					color: #fff;
					width: 70%;
					height: 100%;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
				}

				.header-operation {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					width: 12%;
					position: absolute;
					bottom: 0;
					white-space: nowrap;
					color: #333 !important;

					.header-left-back {
						width: 33rpx;
					}

					&.header-left-box {
						left: 0;
					}

					&.header-right-box {
						width: auto;
					}
				}
			}
		}
	}
</style>
