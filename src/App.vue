<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>

export default {
	name: "App",
	methods: {
		changeWindowHeight() {
			// 计算网页文档高度（减去浏览器横向滚动条的高度）
			let height = window.innerHeight - 17;
			// console.log("高度=", height);
			document.getElementById("app").style.height = height + "px";
		}
	},
	mounted() {
		this.changeWindowHeight();
		window.onresize = () => {
			return (() => {
				this.$nextTick(() => {
					this.changeWindowHeight();
				});
			})();
		};
	}
}
</script>

<style>
</style>
