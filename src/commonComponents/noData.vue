<template>
    <view class="NoData-box" :style="{marginTop: marginTop + 'rpx'}">
        <image
            class="no-data-img"
            :src="icon"
            mode="widthFix"
			:style="{
				width: width + 'rpx',
				height: height + 'rpx'
			}"
        />
		<view 
			class="no-data-tip t-w center relative" 
			:style="{
				fontSize: textSize + 'rpx',
				color: textColor
			}"
		>{{ text }}</view>
    </view>
</template>

<script setup>
	/**
	 * noData 空数据
	 * @description 空数据组件。
	 * @property {String} text 描述文字。
	 * @property {Number | String} textSize 文字大小(默认值: 30)。
	 * @property {String} textColor 文字颜色(默认值: #333)
	 * @property {String} icon 图标。
	 * @property {Number | String} width 图标宽度(默认值: 248)。
	 * @property {Number | String} height 图标高度(默认值: 248)。
	 * @property {String} marginTop 距离上一个元素的距离(默认值: 300)。
	 * @example <noData></noData>
	 */
	import { ref } from "vue";
	let porps = defineProps({
		// 描述文字
		text: {
			default: "暂无数据~",
		},
		// 文字大小
		textSize: {
			default: 30
		},
		// 文字颜色
		textColor: {
			default: "#333"
		},
		// 图标
		icon: {
			default: "/static/img/noData/1.png"
		},
		// 图标宽
		width: {
			default: 248
		},
		// 图标高
		height: {
			default: 248
		},
		// 距离上一个元素距离
		marginTop: {
			default: 300
		}
	})
</script>

<style lang="less" scoped>
.NoData-box {
    text-align: center;
   .no-data-img {
        display: block;
        margin: 0 auto;
		margin-bottom: 30rpx;
    }
    .no-data-tip {
		font-weight: 400;
    }
}
</style>