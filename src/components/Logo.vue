<!--网页logo-->
<template>
	<div>
		<a-row>
			<a-col :span="8"></a-col>
			<a-col :span="8" class="logo-area">
				<img :src="logoIcon" class="logo" alt="程序图标"/>
				<no-select-font class="logo-font" :text="logoText"/>
			</a-col>
			<a-col :span="8"></a-col>
		</a-row>
		<a-row class="logo-sub-font">
			<no-select-font :text="logoSubText"/>
		</a-row>
	</div>
</template>

<script>
export default {
	name: "Logo",
	props: [
		// logo图标
		"logoIcon",
		// logo名称
		"logoText",
		// logo描述文字
		"logoSubText"
	]
}
</script>

<style scoped>
.logo-area {
	margin-top: 2em;
	display: flex;
	justify-content: center;
	align-items: center;
}

.logo {
	border: 1px dashed;
	border-radius: 1em;
	padding: 0.5em;
}

.logo-font {
	font-size: 2.5em;
	font-weight: bold;
	margin-left: 0.5em;
}

.logo-sub-font {
	margin-top: 1em;
}
</style>