<template>
	<div>
		<a-breadcrumb separator="/">
			<a-breadcrumb-item href="/">
				<a-icon type="setting"/>
				<span>系统管理</span>
			</a-breadcrumb-item>
			<a-breadcrumb-item>
				<a-icon type="team"/>
				<span>角色管理</span>
			</a-breadcrumb-item>
		</a-breadcrumb>
		<a-divider/>
		<div style="overflow: hidden">
			<a-card hoverable
					style="width: 15em;float:left;margin-right: 2em;margin-top: 2em;"
					v-for="role in roleList"
					:key="role.id">
				<a-card-meta :title="role.name" style="text-align: center"/>
				<template slot="actions">
					<a-icon type="edit"
							theme="twoTone"
							class="hover-class"
							title="编辑"/>
					<a-popconfirm
							title="确定要删除这个角色吗"
							ok-text="确定"
							cancel-text="取消"
					>
						<a-icon type="delete"
								theme="twoTone"
								two-tone-color="#ff4d4f"
								class="hover-class"
								title="删除"/>
					</a-popconfirm>
				</template>
			</a-card>
			<a-card hoverable style="width: 15em;float:left;margin-top: 2em;">
				<a-card-meta title="更多操作" style="text-align: center"/>
				<template slot="actions">
					<a-icon type="usergroup-add"
							@click="toAdd"
							title="创建新角色"/>
				</template>
			</a-card>
		</div>
		<a-modal v-model="dialogVisible"
				 :title="dialogTitle"
				 :mask-closable="false"
				 @ok="dialogVisible = false">
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</a-modal>
	</div>
</template>

<script>
export default {
	name: "RoleManage",
	data() {
		return {
			// 角色列表
			roleList: [],
			// 对话框操作码：0角色创建、1角色编辑，默认为0
			operateCode: 0,
			// 对话框标题
			dialogTitle: "角色创建",
			// 权限操作框显示与隐藏
			dialogVisible: false,
		}
	},
	methods: {
		handleQuery() {
			this.$api.role.getRoleList(null, data => {
				this.roleList = data;
			});
		},
		toAdd() {
			this.operateCode = 0;
			this.dialogTitle = "角色创建";
			this.dialogVisible = true;
		}
	},
	mounted() {
		this.handleQuery();
	}
}
</script>

<style scoped>
.hover-class:hover {
	opacity: 0.5;
}
</style>
