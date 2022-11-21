<!--不可选中的字体-->
<template>
	<span class="font-style">{{ text }}</span>
</template>

<script>
export default {
	name: "NoSelectFont",
	props: ["text"]
}
</script>

<style scoped>
.font-style {
	user-select: none;
}
</style>