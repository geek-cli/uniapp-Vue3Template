<script>
	import { getCurrentInstance } from "vue";
	export default {
		onLaunch: function(option) {
			console.log(option);
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	
</style>
