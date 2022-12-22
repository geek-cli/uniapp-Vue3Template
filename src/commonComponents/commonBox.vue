<template>
	<view class="commonBox">
		<uni-popup ref="popup" type="center" :maskClick="isMaskClose">
			<view class="popup borderBox">
				<slot name="title">
					<view v-if="title" class="title">
						{{ title }}
					</view>
				</slot>
				<slot name="content">
					<view class="content" v-if="content">
						{{ content }}
					</view>
				</slot>
				<view class="btns flex f-x-c">
					<view class="cancel" v-if="isShowCancel" @click.stop="$emit('cancel')">{{ cancel }}</view>
					<view class="confirm" v-if="isShowConfirm" @click.stop="$emit('confirm')">{{ confirm }}</view>
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
			default: '',
		},
		cancel: {
			default: '取消',
		},
		confirm: {
			default: '确认',
		},
		content: {
			default: '',
		},
		isMaskClose: {
			default: true,
		},
		isShowCancel: {
			default: true
		},
		isShowConfirm: {
			default: true
		}
	})
	
	let popup = ref(null);
	
	// 打开
	let open = ()=>{
		popup.value.open();
	}
	// 关闭
	let close = ()=>{
		popup.value.close();
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
			padding: 65rpx 40rpx 40rpx;
			width: 600rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			box-sizing: border-box;

			.title {
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
				text-align: center;
				margin-bottom: 45rpx;
			}
			
			.content {
				font-size: 32rpx;
				line-height: 50rpx;
				font-weight: 400;
				color: #999999;
				text-align: center;
			}
			

			.btns {
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;

				>view {
					width: 230rpx;
					padding: 20rpx 0;
					border-radius: 38rpx;
					text-align: center;
					font-size: 32rpx;
					font-weight: 400;
					color: #999999;
				}

				.cancel {
					color: #999999;
					background: #EEE;
				}

				.confirm {
					color: #fff;
					background: #3F63F5;
				}
			}
		}
	}
</style>
