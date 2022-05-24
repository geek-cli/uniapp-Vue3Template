<template>
	<view class="popup">
		<teleport to="body">
			<view class="modal">
				I'm a teleported modal! 
				(My parent is "body")
			</view>
		</teleport>
	</view>
</template>

<script>
	export default {
		name:"popup",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>