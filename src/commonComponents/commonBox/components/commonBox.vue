<template>
	<view class="commonBox">
		<uni-popup ref="popup" type="center" :maskClick="isMaskClose">
			<view class="popup bgImg t-w t-c">
				<slot name="title">
					<view v-if="title" class="title">
						{{title}}
					</view>
				</slot>
				<slot name="content">
					<view class="content" v-if="content">
					{{content}}
					</view>
				</slot>
				<view class="btns flex f-r f-x-c">
					<view class="cancel btn" :class="{all: !isShowConfirm}" v-if="isShowCancel" @click.stop="close">
						{{cancel}}
					</view>
					<view class="confirm btn" :class="{all: !isShowCancel}" v-if="isShowConfirm" @click.stop="$emit('confirm')">
						{{confirm}}
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	/**
	 * commonBox 询问框
	 * @description 询问框
	 * @property {String} title 询问标题(默认值: "")。
	 * @property {String} cancel 取消提示文字(默认值: 取消)。
	 * @property {String} confirm 确认提示文字(默认值: "确认")。
	 * @property {String} content 询问内容(默认值: "")。
	 * @property {Boolean} isMaskClose 是否可以点击遮罩层关闭(默认值: true)。
	 * @property {Boolean} isShowCancel 是否显示取消按钮(默认值: true)。
	 * @property {Boolean} isShowConfirm 是否显示确认按钮(默认值: true)。
	 * @event {Function()}  confirm 确认事件
	 * @event {Function()}  cancel 取消事件
	 * @example <commonBox title="交易提醒" content="请问您是否同意进行交易呢？" cancel="不同意" confirm="同意"></commonBox>
	 */
	import {
		ref,
		reactive,
		inject,
		toRefs,
		watch
	} from "vue";
	
	let props = defineProps({
		title: {
			default: '标题',
		},
		cancel: {
			default: '取消',
		},
		confirm: {
			default: '确认',
		},
		content: {
			default: '模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作。',
		},
		isMaskClose: {
			default: false,
		},
		isShowCancel: {
			default: true
		},
		isShowConfirm: {
			default: true
		}
	})
	
	let emit = defineEmits(['confirm', 'cancel']);
	
	let popup = ref(null);
	
	// 打开
	let open = ()=>{
		popup.value.open();
		emit('confirm')
	}
	// 关闭
	let close = ()=>{
		popup.value.close();
		emit('cancel')
	}
	
	// 导出方法
	defineExpose({
		open,
		close
	})
</script>

<style lang="less" scoped>
	.commonBox {
		position: fixed;
		z-index: 999;

		.popup {
			box-sizing: border-box;
			background-color: #fff;
			padding: 50rpx 35rpx 40rpx;
			width: 600rpx;
			border-radius: 24rpx;
			
			.title {
				margin-bottom: 20rpx;
				font-size: 36rpx;
				font-weight: 600;
				color: #333333;
				text-align: center;
			}
			
			.content {
				font-weight: 400;
				color: #333;
				font-size: 32rpx;
			}
			

			.btns {
				margin-top: 45rpx;
				display: flex;
				justify-content: space-between;
				line-height: 1;

				.btn {
					width: 220rpx;
					padding: 20rpx 0;
					border-radius: 38rpx;
					line-height: 1;
					text-align: center;
					font-size: 32rpx;
					font-weight: 400;
					&.all {
						width: 100%;
					}
				}

				.cancel {
					background: #EEE;
					color: #999999;
				}

				.confirm {
					background: #2979ff;
					color: #fff;
				}
			}
		}
	}
</style>
