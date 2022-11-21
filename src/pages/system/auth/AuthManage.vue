<template>
	<div>
		<a-layout>
			<a-layout-sider style="background: white">
				<a-tree :tree-data="treeData">
					<template #title="{ key: treeKey, title }">
						<a-dropdown :trigger="['contextmenu']">
							<span>{{ title }}</span>
							<template #overlay>
								<a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
									<a-menu-item key="1">新建子权限</a-menu-item>
									<a-menu-item key="2">查看关联角色</a-menu-item>
									<a-menu-item key="3">删除</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</template>
				</a-tree>
				<a-button>新建父权限</a-button>
			</a-layout-sider>
			<a-layout>
				<a-layout-header style="background: white">仪表盘-编辑</a-layout-header>
				<a-layout-content>Content</a-layout-content>
				<a-layout-footer>Footer</a-layout-footer>
			</a-layout>
		</a-layout>
	</div>
</template>

<script>
export default {
	name: "AuthManage",
	data() {
		return {
			treeData: []
		}
	},
	methods: {
		handleQueryList() {
			this.$api.auth.getAuthList({
				id: 1
			}, res => {
				console.log(res.data);
				this.treeData = res.data;
			});
		},
		onContextMenuClick(treeKey, menuKey) {
			console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
		},
	},
	mounted() {
		this.handleQueryList();
	}
}
</script>

<style scoped>

</style>
