<template>
	<view class="LongList">
		<slot v-for="(item, index) in listArr" :data="item" :list="listArr" :index="index"></slot>
		<w-noData v-if="noDataStatus"></w-noData>
	</view>
</template>

<script setup>
	/**
	 * LongList 长列表
	 * @description 长列表组件。
	 * @property {String} modelValue 长列表数据。
	 * @property {Object} requestData 接口方法。
	 * @property {String} requestData.apiName 请求的接口名。
	 * @property {Object} requestData.params 请求的接口所携带的参数，不需要传入page, page已作处理。
	 * @property {String} noDataMsg 空数据提示文字
	 * @property {Function} dataProcessing 加工数据，会在每次请求数据后调用此方法进行数据加工，需要返回加工后的数据。
	 * @event {Function} update:modelValue 用于更新modelValue数据。
	 * @example <noData></noData>
	 */
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

	let listArr = ref([]);
	let noDataStatus = ref(false);
	let page = ref(1);
	let requestStatus = ref(false);
	let copyRequestData = {};

	// props
	let props = defineProps({
		// 数据列表
		modelValue: {
			type: Array,
			default: []
		},
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
		listArr.value = props.modelValue;
		getListData();
	});

	let getListData = () => {
		if (!props.requestData.apiName) {
			return;
		}
		if (requestStatus.value) {
			return;
		}
		requestStatus.value = true;
		$api[props.requestData.apiName]({
				page: page.value,
				...props.requestData.params,
			})
			.then((res) => {
				if (page.value == 1) {
					listArr.value = [];
					noDataStatus.value = false;
				}
				
				if (props.dataProcessing) {
					listArr.value = listArr.value.concat(props.dataProcessing(res.list.data));
				} else {
					listArr.value = listArr.value.concat(res.list.data);
				}
				
				// 暂无数据
				if(!listArr.value || !listArr.value.length || res.list.total == 0) {
					//第一页
					if(page.value == 1) {
						noDataStatus.value = true;
					}
					// 无更多数据集
					requestStatus.value = true;
				} else {
					requestStatus.value = false;
				}
				
				// 更新数据
				emits('update:modelValue', listArr.value);
				
				page.value++;
			})
			.catch((err) => {
				console.log(err);
				requestStatus.value = false;
			});
	};

	onReachBottom(() => {
		getListData();
	});

	let overloadedData = () => {
		page.value = 1;
		requestStatus.value = false;
		getListData();
	};

	watch(
		() => props.requestData,
		(n, o) => {
			if (JSON.stringify(n) !== JSON.stringify(copyRequestData)) {
				copyRequestData = JSON.parse(JSON.stringify(n));
				overloadedData();
			}
		}, {
			deep: true
		}
	);

	defineExpose({
		overloadedData,
	});
</script>

<style lang="less" scoped>
</style>
