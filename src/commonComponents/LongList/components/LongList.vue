<template>
	<view class="LongList">
		<slot v-for="(item, index) in listArr" :data="item"></slot>
		<znx-noData v-if="noDataStatus"></znx-noData>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		inject,
		toRefs,
		watch,
		computed,
		onMounted
	} from 'vue';
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app';
	// 获取全局对象
	const global = inject('global');
	// 解构需要使用的部分
	const {
		$Common,
		$api
	} = global;

	let listArr = $ref([]);
	let noDataStatus = $ref(false);
	let page = $ref(1);
	let requestStatus = $ref(false);

	// props
	let props = defineProps({
		// 接口数据
		requestData: {
			type: Object,
			required: true,
			default: function() {
				return {
					apiName: '', // 接口名称
					params: {}, // 接口其他参数
				};
			},
		},
		// 没有数据时的提示
		noDataMsg: {
			type: String,
			required: false,
			default: function() {
				return '暂无信息';
			},
		},
		// 处理接口返回的数据
		dataProcessing: {
			type: [Function, Boolean],
			required: false,
			default: false
		},
	});

	// 挂载时
	onMounted(() => {
		getListData();
	});

	let getListData = () => {
		if (!props.requestData.apiName) {
			return;
		}
		if (requestStatus) {
			return;
		}
		requestStatus = true;
		$api[props.requestData.apiName]({
				page: page,
				...props.requestData.params,
			})
			.then((res) => {
				if (page == 1) {
					listArr = [];
				}
				if (props.dataProcessing) {
					listArr = listArr.concat(props.dataProcessing(res.list.data));
				} else {
					listArr = listArr.concat(res.list.data);
				}
				page = page + 1;
				if (res.list.data.length > 0) {
					requestStatus = false;
				}
				if (res.list.total == 0) {
					noDataStatus = true;
				} else {
					noDataStatus = false;
				}
			})
			.catch((err) => {
				console.log(err);
				requestStatus = false;
			});
	};

	onReachBottom(() => {
		getListData();
	});

	let overloadedData = () => {
		page = 1;
		requestStatus = false;
		getListData();
	};

	watch(
		()=> props.requestData,
		(n, o) => {
			if(JSON.stringify(n) !== JSON.stringify(o)) {
				overloadedData();
			}
		},
		{deep: true}
	);

	defineExpose({
		overloadedData,
	});
</script>

<style lang="less" scoped>
</style>
