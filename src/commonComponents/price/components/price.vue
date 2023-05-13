<template>
	<view class="price_container" :style="{height: fontSize + 'rpx'}">
		<view class="unit" :style="{fontSize: fontSize * 0.6 + 'rpx'}">{{unit}}</view>
		<template v-for="(item, index) in priceArr" :key="index">
			<view class="price" :style="{fontSize: fontSize }">{{item.integer}}</view>
			<view class="point" :style="{fontSize: fontSize * 0.6 + 'rpx'}" v-if="item.decimal">.{{item.decimal}}{{ index != priceArr.length - 1 ? '~' : ''}}</view>
		</template>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		inject,
		toRefs,
		watch,
		nextTick,
		onMounted,
		onRenderTracked
	} from 'vue';

	let props = defineProps({
		// 价格
		price: {
			type: String,
			default: '0.00'
		},
		// 单位
		unit: {
			type: String,
			default: '￥'
		},
		// 是否默认保留小数 用于在传入整数时。默认保留两位小数使用
		isDefaultRetain: {
			type: Boolean,
			default: true
		},
		// 最小保留位数
		minRetainNum: {
			type: Number,
			default: 2
		},
		// 颜色
		color: {
			type: String,
			default: '#EF4034'
		},
		// 字体大小 单位rpx
		fontSize: {
			type: Number,
			default: 34
		}
	})

	// 价格数组
	let priceArr = ref([]);

	// 初始化
	let init = () => {
		let arr = (props.price + '').split('~');
		arr.forEach((item, index) => {
			let itemArr = item.split('.');
			// 如果不存在小数
			if (!itemArr[1] && props.isDefaultRetain) {
				// 补全位数
				itemArr[1] = '0'.padStart(props.minRetainNum, '0');
			} else {
				// 补全少于位数
				itemArr[1] = itemArr[1] + ''.padStart(props.minRetainNum - itemArr[1].length, '0')
			}

			if (priceArr.value[index]) {
				priceArr.value.splice(index, 1, {
					integer: itemArr[0],
					decimal: itemArr[1]
				})
			} else {
				priceArr.value.push({
					integer: itemArr[0],
					decimal: itemArr[1]
				})
			}
		})
	}

	onMounted(() => {
		init();
	})

	watch([() => props.price, () => props.minRetainNum, () => props.isDefaultRetain, () => props.unit], (n) => {
		init();
	})
</script>
<style scoped lang="scss">
	.price_container {
		display: flex;
		align-items: flex-end;
		font-family: 'OPPOSans-B';
		color: v-bind(color);

		.unit {
			font-family: 'OPPOSans-M';
			transform: translateX(1rpx) translateY(-1rpx);
		}
		.point {
			transform: translateY(-1rpx);
		}
	}
</style>
