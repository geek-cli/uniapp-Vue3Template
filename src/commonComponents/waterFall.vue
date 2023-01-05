<template>
	<view class="waterfall">
		<view id="left-column" class="column"><slot name="left" :leftList="leftList"></slot></view>
		<view id="right-column" class="column"><slot name="right" :rightList="rightList"></slot></view>
	</view>
</template>

<script setup>
/**
 * waterfall 瀑布流
 * @description 这是一个瀑布流形式的组件，内容分为左右两列。
 * @property {Array} value 用于渲染的数据
 * @example <waterfall :value="flowList"></waterfall>
 */
import { ref, reactive, inject, toRefs, watch, computed, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// 获取全局对象
const global = inject('global');
// 解构需要使用的部分
const { $Common, $api } = global;

// props
let props = defineProps({
	// 瀑布流数据
	value: {
		type: Array,
		required: true,
		default: function () {
			return [];
		},
	}
});

// 数据
// 左边数据
let leftList = $ref([]);
// 右边数据
let rightList = $ref([]);
// 模板数据
let tempList = $ref([]);

let splitData = async () => {
	if (!tempList.length) return;
	tempList.forEach((item, index)=>{
		index%2 ? rightList.push(item) : leftList.push(item);
	})
};
// 清空数据列表
let clear = () => {
	leftList = [];
	rightList = [];
	// 同时清除父组件列表中的数据
	tempList = [];
};

watch(
	() => props.value,
	n => {
		clear();
		tempList = n;
		splitData();
	}
);

// 挂载时
onMounted(() => {
	tempList = props.value;
	splitData();
});
</script>

<style lang="less" scoped>
.waterfall {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
}

.column {
	display: flex;
	flex: 1;
	flex-direction: column;
	height: auto;
}

.image {
	width: 100%;
}
</style>
