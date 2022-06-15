<template>
	<view class="index">
		<Layout>
			
		</Layout>
	</view>
</template>

<script>
	export default {
		setup(props) {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			this.$api.indexProjectList({}).then(res=>{
				console.log(res)
			})
		}
	}
</script>

<style lang="less" scoped>
	.index {
		.content {
			height: 100vh;
		}
	}
</style>
