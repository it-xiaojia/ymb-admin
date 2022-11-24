<template>
	<div>
		<div style="font-size: 1.5em;text-align: center">
			<a-icon type="dashboard" />
			<span style="margin-left: 1em">仪表盘</span>
		</div>
		<a-divider/>
		<div v-for="auth in dashboardAuthList">
			{{ auth.auth.name }}
			<a-divider/>
		</div>
	</div>
</template>

<script>
export default {
	name: "Dashboard",
	props: ["dashboardAuthList"],
	watch: {
		// 监听从主页传输过来的仪表盘权限列表
		dashboardAuthList: function (authList) {
			console.log("加载仪表盘权限列表", authList);
		}
	}
}
</script>

<style scoped>

</style>
