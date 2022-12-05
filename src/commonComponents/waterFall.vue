<template>
	<view class="waterfall">
		<view id="left-column" class="column"><slot name="left" :leftList="leftList"></slot></view>
		<view id="right-column" class="column"><slot name="right" :rightList="rightList"></slot></view>
	</view>
</template>

<script setup>
	/**
	 * waterfall 瀑布流
	 * @description 这是一个瀑布流形式的组件，内容分为左右两列。相较于某些只是奇偶数左右分别，或者没有利用vue作用域插槽的做法，waterFall的瀑布流实现了真正的 组件化，让您开箱即用，眼前一亮。
	 * @property {Array} flow-list 用于渲染的数据
	 * @property {String Number} add-time 单条数据添加到队列的时间间隔，单位ms，见上方注意事项说明（默认200）
	 * @example <waterfall :value="flowList"></waterfall>
	 */
	import { ref, reactive, inject, toRefs, watch, computed, onMounted } from "vue";
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
			default: function() {
				return [];
			},
		},
		// 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
		// 单位ms
		addTime: {
			type: [Number, String],
			default: 200
		},
		// id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{idx: 22, name: 'lisa'}
		// 那么该把idKey设置为idx
		idKey: {
			type: String,
			default: 'id'
		}
	})
	
	// 数据
	// 左边数据
	let leftList = ref([]);
	// 右边数据
	let rightList = ref([]);
	// 模板数据
	let tempList = ref([]);
	// 子
	let children = ref([]);
	// 破坏flowList变量的引用，否则watch的结果新旧值是一样的
	let copyFlowList = computed(()=>cloneData(props.value));
	
	let splitData = async ()=>{
		if (!tempList.value.length) return;
		let query = uni.createSelectorQuery();
		query.select('#left-column').boundingClientRect();
		query.select('#right-column').boundingClientRect();
		query.exec(data=>{
			let leftRect = data[0];
			let rightRect = data[1];
			// 如果左边小于或等于右边，就添加到左边，否则添加到右边
			let item = tempList.value[0];
			// 解决多次快速上拉后，可能数据会乱的问题，因为经过上面的两个await节点查询阻塞一定时间，加上后面的定时器干扰
			// 数组可能变成[]，导致此item值可能为undefined
			if(!item) return ;
			if (leftRect.height < rightRect.height) {
				leftList.value.push(item);
			} else if (leftRect.height > rightRect.height) {
				rightList.value.push(item);
			} else {
				// 这里是为了保证第一和第二张添加时，左右都能有内容
				// 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
				if (leftList.value.length <= rightList.value.length) {
					leftList.value.push(item);
				} else {
					rightList.value.push(item);
				}
			}
			// 移除临时列表的第一项
			tempList.value.splice(0, 1);
			// 如果临时数组还有数据，继续循环
			if (tempList.value.length) {
				setTimeout(() => {
					splitData();
				}, props.addTime)
			} else {
				console.log(leftList.value, right.value);
			}
		})
	};
	// 复制而不是引用对象和数组
	let cloneData = data=> JSON.parse(JSON.stringify(data));
	// 清空数据列表
	let clear = ()=> {
		leftList.value = [];
		rightList.value = [];
		// 同时清除父组件列表中的数据
		tempList.value = [];
	};
	// 清除某一条指定的数据，根据id实现
	let remove = id=>{
		// 如果findIndex找不到合适的条件，就会返回-1
		let index = -1;
		index = leftList.value.findIndex(val => val[props.idKey] == id);
		if(index != -1) {
			// 如果index不等于-1，说明已经找到了要找的id，根据index索引删除这一条数据
			leftList.value.splice(index, 1);
		} else {
			// 同理于上方面的方法
			index = rightList.value.findIndex(val => val[props.idKey] == id);
			if(index != -1) rightList.value.splice(index, 1);
		}
		// 同时清除父组件的数据中的对应id的条目
		index = props.value.findIndex(val => val[props.idKey] == id);
	};
	// 修改某条数据的某个属性
	let modify = (id, key, value)=>{
		// 如果findIndex找不到合适的条件，就会返回-1
		let index = -1;
		index = leftList.value.findIndex(val => val[props.idKey] == id);
		if(index != -1) {
			// 如果index不等于-1，说明已经找到了要找的id，修改对应key的值
			leftList.value[index][key] = value;
		} else {
			// 同理于上方面的方法
			index = rightList.value.findIndex(val => val[props.idKey] == id);
			if(index != -1) rightList.value[index][key] = value;
		}
		// 修改父组件的数据中的对应id的条目
		index = props.value.findIndex(val => val[props.idKey] == id);
		if(index != -1) {
			// 首先复制一份value的数据
			let data = cloneData(props.value);
			// 修改对应索引的key属性的值为value
			data[index][key] = value;
		}
	}
	
	// 监听
	watch(copyFlowList, (nVal, oVal)=>{
		// 取差值，即这一次数组变化新增的部分
		let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
		// 拼接上原有数据
		tempList.value = tempList.value.concat(cloneData(nVal.slice(startIndex)));
		splitData();
	})
	
	// 挂载时
	onMounted(()=>{
		tempList.value = cloneData(copyFlowList.value);
		splitData();
	})
	
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
