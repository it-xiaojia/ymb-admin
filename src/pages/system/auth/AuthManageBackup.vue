<template>
	<div>
		<a-collapse accordion>
			<a-collapse-panel v-for="(auth, index) in authList"
							  :key="index"
							  v-if="auth.parentAuthId === null"
							  :header="auth.name">
				<small style="color: darkgrey;" class="btn-margin" v-if="auth.hasChild === 0">当前权限无子权限</small>
				<a-list :data-source="authList" class="btn-margin">
					<a-list-item slot="renderItem" slot-scope="item, index" v-if="item.parentAuthId === auth.id">
						{{ item.name }}
						<a-icon slot="actions"
								class="hover-class"
								title="修改图标"
								@click.stop="toEditAuthIcon(item.id)"
								:type="item.iconClass"/>
						<a-icon slot="actions"
								type="edit"
								title="编辑"
								@click.stop="toEditChildAuth(auth.name, item.id)"
								theme="twoTone"
								class="hover-class"/>
						<div slot="actions">
							<a-popconfirm
									title="确定要删除这个子权限吗"
									ok-text="确定"
									cancel-text="取消"
									@confirm="handleDelete(item)"
									placement="leftBottom"
							>
								<a-icon type="delete"
										title="删除"
										@click.stop=""
										theme="twoTone"
										two-tone-color="#ff4d4f"
										class="hover-class"/>
							</a-popconfirm>
						</div>
					</a-list-item>
				</a-list>
				<a-icon slot="extra"
						type="plus-circle"
						title="添加子权限"
						theme="twoTone"
						@click.stop="toAddChildAuth(auth.id, auth.name)"
						two-tone-color="#52c41a"
						class="hover-class"/>
				<a-icon slot="extra"
						class="hover-class btn-margin"
						title="修改图标"
						@click.stop="toEditAuthIcon(auth.id)"
						:type="auth.iconClass"/>
				<a-icon slot="extra"
						type="edit"
						title="编辑"
						@click.stop="toEditParentAuth(auth.id)"
						theme="twoTone"
						class="hover-class btn-margin"/>
				<div slot="extra" v-if="auth.hasChild === 0" style="display: inline-block">
					<a-popconfirm
							title="确定要删除这个父权限吗"
							ok-text="确定"
							cancel-text="取消"
							@confirm="handleDelete(auth)"
							placement="leftBottom"
					>
						<a-icon
								type="delete"
								title="删除"
								theme="twoTone"
								two-tone-color="#ff4d4f"
								@click.stop=""
								class="hover-class btn-margin"/>
					</a-popconfirm>
				</div>
			</a-collapse-panel>
		</a-collapse>
		<div style="text-align: center">
			<a-button icon="plus" shape="circle" title="添加父权限" @click="toAddParentAuth"></a-button>
		</div>
		<a-modal
				:title="dialogTitle"
				:visible.sync="dialogVisible"
				width="30%">
			<a-form label-width="85px">
				<!-- 在单独修改图标时，不显示这三个 -->
				<div v-if="operateCode !== 4">
					<!-- 在操作子权限时，显示此内容 -->
					<a-form-item v-if="operateCode === 2 || operateCode === 3" label="父权限名称">
						<a-input :value="parentAuthName" disabled/>
					</a-form-item>
					<a-form-item label="权限名称">
						<a-input v-model="auth.name" placeholder="请输入权限名称"/>
					</a-form-item>
					<!-- 如果是父权限，则没有url -->
					<a-form-item v-if="operateCode === 2 || operateCode === 3" label="权限url">
						<a-input v-model="auth.url" placeholder="权限url应该与目标vue路由名称一致"/>
					</a-form-item>
				</div>
				<a-form-item label="权限图标类">
					<a-input v-model="auth.iconClass" placeholder="仅支持AntDesignVue框架中的图标"/>
				</a-form-item>
			</a-form>
			<span slot="footer" class="dialog-footer">
				<a-button @click="dialogVisible = false">取 消</a-button>
				<a-button type="primary" @click="handleEdit(auth)">确 定</a-button>
  			</span>
		</a-modal>
	</div>
</template>

<script>
export default {
	name: "AuthManage",
	data() {
		return {
			authList: [],
			expandIconPosition: "left",
			// 权限操作框显示与隐藏
			dialogVisible: false,
			// 对话框操作码：0父权限添加、1父权限编辑、2子权限添加、3子权限编辑、4权限图标修改，默认为0
			operateCode: 0,
			// 对话框标题
			dialogTitle: "父权限添加",
			parentAuthName: "",
			auth: {}
		}
	},
	methods: {
		toAddParentAuth() {
			this.operateCode = 0;
			this.dialogTitle = "父权限添加";
			this.dialogVisible = true;
			this.auth = {}
		},
		toEditParentAuth(authId) {
			this.operateCode = 1;
			this.dialogTitle = "父权限编辑";
			this.dialogVisible = true;
			this.$api.auth.getAuthById(authId, data => {
				this.auth = data;
			});
		},
		toAddChildAuth(authId, parentAuthName) {
			this.operateCode = 2;
			this.dialogTitle = "子权限添加";
			this.dialogVisible = true;
			this.auth = {};
			this.auth.parentAuthId = authId;
			this.parentAuthName = parentAuthName;
		},
		toEditChildAuth(parentAuthName, childAuthId) {
			this.operateCode = 3;
			this.dialogTitle = "子权限编辑";
			this.dialogVisible = true;
			this.parentAuthName = parentAuthName;
			this.$api.auth.getAuthById(childAuthId, data => {
				this.auth = data;
			});
		},
		toEditAuthIcon(authId) {
			this.operateCode = 4;
			this.dialogTitle = "权限图标编辑";
			this.dialogVisible = true;
			this.$api.auth.getAuthById(authId, data => {
				this.auth = data;
			});
		},
		handleQuery() {
			this.$api.auth.getAuthList({
				id: 1
			}, res => {
				this.authList = res.data;
			});
		},
		handleEdit(auth) {
			switch (this.operateCode) {
				case 0:
					// 父权限添加
					this.$api.auth.addAuth(auth, () => {
						this.$message.success("父权限添加成功");
						this.dialogVisible = false;
						this.handleQuery();
					});
					break;
				case 1:
					// 父权限编辑
					this.$api.auth.updateAuth(auth, () => {
						this.$message.success("成功编辑一条父权限");
						this.dialogVisible = false;
						this.handleQuery();
					});
					break;
				case 2:
					// 子权限添加
					this.$api.auth.addAuth(auth, () => {
						this.$message.success("子权限添加成功");
						this.dialogVisible = false;
						this.handleQuery();
					});
					break;
				case 3:
					// 子权限编辑
					this.$api.auth.updateAuth(auth, () => {
						this.$message.success("成功编辑一条子权限");
						this.dialogVisible = false;
						this.handleQuery();
					});
					break;
				case 4:
					// 权限图标修改
					this.$api.auth.updateAuth(auth, () => {
						this.$message.success("成功更新权限图标");
						this.dialogVisible = false;
						this.handleQuery();
					});
					break;
			}
		},
		handleDelete(auth) {
			this.$api.auth.deleteAuth(auth, () => {
				this.$message.success("成功删除一条权限");
				this.handleQuery();
			});
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

.btn-margin {
	margin-left: 1em;
}
</style>
