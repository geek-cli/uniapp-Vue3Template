<template>
	<view class="html" v-html="newHtml"></view>
</template>

<script setup>
	import {
		ref,
		reactive,
		inject,
		toRefs,
		watch,
		onMounted
	} from "vue";
	// 获取全局对象
	const global = inject('global');
	// 解构需要使用的部分
	const {
		$Common,
		$api
	} = global;

	let props = defineProps({
		html: {
			default: '',
			type: String
		}
	})

	let newHtml = ref('');

	// 初始化html
	let initHtml = () => {
		newHtml.value = props.html;
		newHtml.value = handleImg();
		newHtml.value = handleText();
	}

	// 处理图片相关样式
	let handleImg = () => {
		// 替换商品详情文本
		return newHtml.value.replace(/\<img/gi, '<img style="max-width: 100%; height: auto; display: block;"')
	};
	
	// // 处理文本相关样式
	let handleText = () => {
		// 替换商品详情文本
		return newHtml.value.replace(/\<p/gi, '<p style="line-height: 1.5"')
	};
	
	onMounted(()=>{
		initHtml();
	})

	watch(() => props.html, n => {
		initHtml();
	})
</script>

<style lang="less" scoped>
	.html {
		//  不识别单词一行显示不下默认换行
		word-break: break-all;
		//  识别单词 不会造成单词断开换行
		word-wrap: break-word;
	}
</style>
