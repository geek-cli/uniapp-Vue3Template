<template>
    <view class="NoData-box">
        <image
            class="no-data-img"
            :src="img"
            mode="widthFix"
        />
        <view class="no-data-tip t-w center relative">{{ alertText }}</view>
    </view>
</template>

<script setup>
	/**
	 * noData 空数据
	 * @description 空数据组件。
	 * @property {String} alertText 描述文字。
	 * @property {String} img 空数据图。
	 * @example <waterfall :value="flowList"></waterfall>
	 */
	import { ref } from "vue";
	let porps = defineProps({
		alertText: {
			default: "这里什么都没有 去别处看看吧",
		},
		img: {
			default: "../static/noData.png"
		}
	})
</script>

<style lang="less" scoped>
.NoData-box {
    text-align: center;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
    .no-data-img {
        display: block;
        margin: 0 auto;
        width: 248rpx;
		height: 248rpx;
		background-color: #999999;
    }
    .no-data-tip {
        font-size: 24rpx;
        font-weight: 500;
        color: #999999;
		line-height: 40rpx;
		margin-top: 20rpx;
    }
}
</style>