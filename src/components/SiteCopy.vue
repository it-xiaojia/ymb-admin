<!--站点版权信息-->
<template>
	<div>
		<div>
			<a-icon type="user"/>
			<no-select-font :text="'站长：' + siteOwner" class="site-copy-info"/>
		</div>
		<div style="margin-top: 0.3em">
			<no-select-font text="©"/>
			<no-select-font :text="getCurrentYear" class="site-copy-info"/>
			<no-select-font :text="siteOwner" class="site-copy-info"/>
		</div>
	</div>
</template>

<script>
export default {
	name: "SiteCopy",
	props: ["siteOwner"],
	computed: {
		getCurrentYear() {
			return new Date().getFullYear();
		}
	}
}
</script>

<style lang="less" scoped>
.site-copy-info {
	margin-left: 0.5em;
}
</style>