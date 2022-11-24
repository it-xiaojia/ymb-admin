<!--主页面框架-->
<template>
	<div class="full-height">
		<a-layout style="min-height: 100vh">
			<!--侧边栏-->
			<a-layout-sider style="background-color: white">
				<!--文字logo-->
				<div class="logo animate__animated animate__backInLeft" title="点击去仪表盘" @click="openDashboard">
					忆梦博客-管理端
				</div>
				<!--侧边菜单（二级菜单）-->
				<a-menu mode="inline" :default-selected-keys="defaultSelectMenuKey.level2Key" @click="openPage">
					<a-menu-item v-for="level2 in userInfo.level2AuthList"
								 :key="level2.auth.id + ',' + level2.auth.url">
						<a-icon :type="level2.auth.iconClass"/>
						<span>{{ level2.auth.name }}</span>
					</a-menu-item>
				</a-menu>
			</a-layout-sider>
			<!--内容区域-->
			<a-layout>
				<!--header区域-->
				<a-layout-header style="background: #fff; padding: 0; border-radius: 5px;"
								 class="top-nav animate__animated animate__backInRight">
					<a-row style="margin-top: 0.5em">
						<!--顶部菜单栏（一级菜单）-->
						<a-col :span="14" style="padding-left: 1em">
							<a-menu v-model="defaultSelectMenuKey.level1Key" mode="horizontal" @click="queryLevel2Menu">
								<a-menu-item v-for="level1 in userInfo.level1AuthList" :key="level1.auth.id">
									<a-icon :type="level1.auth.iconClass"/>
									{{ level1.auth.name }}
								</a-menu-item>
							</a-menu>
						</a-col>
						<!--用户操作区域-->
						<a-col :span="10" style="text-align: right;padding-right: 24px">
							<no-select-font style="margin-right: 5px;font-size: 0.8em"
											:text="'你好！' + userInfo.roleName + '-' + userInfo.user.username"/>
							<a href="#" @click.prevent="updatePasswordVisible = true" class="sys">[修改密码]</a>
							<a href="#" @click.prevent="exitLoginVisible = true" class="sys">[退出登录]</a>
						</a-col>
					</a-row>
				</a-layout-header>
				<!--操作内容区域-->
				<a-layout-content style="margin: 0 16px">
					<div :style="{ padding: '1em', background: '#fff', minHeight: '98%', marginTop: '0.5em' }">
						<router-view :dashboard-auth-list="userInfo.dashBordAuthList"/>
					</div>
				</a-layout-content>
			</a-layout>
		</a-layout>
		<!--修改密码对话框-->
		<a-modal v-model="updatePasswordVisible"
				 title="修改密码"
				 :mask-closable="false"
				 @ok="updatePassword('passwordForm')"
				 ok-text="确定"
				 cancel-text="取消">
			<a-form-model ref="passwordForm" :model="passwordForm" :rules="rules">
				<a-form-model-item has-feedback prop="pass">
					<a-input-password v-model="passwordForm.pass" placeholder="请输入密码">
						<a-icon slot="prefix" type="lock"/>
					</a-input-password>
				</a-form-model-item>
				<a-form-model-item has-feedback prop="checkPass">
					<a-input-password v-model="passwordForm.checkPass" placeholder="请确认密码">
						<a-icon slot="prefix" type="lock"/>
					</a-input-password>
				</a-form-model-item>
			</a-form-model>
		</a-modal>
		<!--退出登录对话框-->
		<a-modal v-model="exitLoginVisible"
				 title="退出登录"
				 :mask-closable="false"
				 @ok="exitLogin"
				 @cancel="exitLoginVisible = false"
				 ok-text="确定"
				 cancel-text="取消">
			确定要退出登录？
		</a-modal>
	</div>
</template>

<script>
import util from "@/common/util";

export default {
	name: "BlogIndex",
	data() {
		// 密码存在性校验
		let validatePass = (rule, value, callback) => {
			if (!this.$util.isStringNotNull(value)) {
				callback(new Error("请输入密码"));
			} else {
				if (this.$util.isStringNotNull(this.passwordForm.checkPass)) {
					this.$refs.passwordForm.validateField("checkPass");
				}
				callback();
			}
		};
		// 密码重复性校验
		let validatePass2 = (rule, value, callback) => {
			if (!this.$util.isStringNotNull(value)) {
				callback(new Error("请确认密码"));
			} else if (value !== this.passwordForm.pass) {
				callback(new Error("两次输入的密码不一致"));
			} else {
				callback();
			}
		};
		return {
			// 默认选中的菜单key对象
			defaultSelectMenuKey: {
				// 一级菜单
				level1Key: [],
				// 二级菜单
				level2Key: []
			},
			// 密码表单
			passwordForm: {
				pass: "",
				checkPass: "",
			},
			// 密码校验规则
			rules: {
				pass: [{validator: validatePass, trigger: "change"}],
				checkPass: [{validator: validatePass2, trigger: "change"}]
			},
			// 密码框是否可见
			updatePasswordVisible: false,
			// 退出登录框是否可见
			exitLoginVisible: false,
			// 用户主页信息
			userInfo: {
				user: {},
				roleName: "未知角色",
				level1AuthList: [],
				level2AuthList: [],
				dashBordAuthList: []
			},
		}
	},
	methods: {
		/**
		 * 查询用户信息
		 */
		queryUserInfo() {
			// 查询基本信息
			this.$api.user.queryIndexUserInfo(null, res => {
				this.userInfo = res.data;
				// 设置默认选中顶部第一个菜单
				this.defaultSelectMenuKey.level1Key.push(this.userInfo.level1AuthList[0].auth.id);
			});
		},
		/**
		 * 根据一级菜单权限的ID查询二级菜单权限
		 * @param item 一级菜单对象
		 */
		queryLevel2Menu(item) {
			this.$api.auth.queryList({
				roleId: this.userInfo.user.userRoleId,
				parentAuthId: item.key
			}, res => {
				this.userInfo.level2AuthList = res.data;
			});
		},
		/**
		 * 打开二级菜单对应的页面
		 * @param item 二级菜单对象
		 */
		openPage(item) {
			let itemArr = item.key.split(",");
			const key = itemArr[0];
			const url = itemArr[1];
			if (this.$route.path !== url) {
				this.$api.auth.queryObject({id: key}, () => {
					this.$router.push(url);
				});
			}
		},
		/**
		 * 打开仪表盘
		 */
		openDashboard() {
			if (this.$route.path !== "/dashboard") {
				this.defaultSelectMenuKey.level1Key = [];
				this.defaultSelectMenuKey.level2Key = [];
				this.queryUserInfo();
				this.$router.push("/dashboard");
			}
		},
		/**
		 * 修改密码
		 * @param formName 密码表单对象
		 */
		updatePassword(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$api.user.updatePassword({
						userId: this.userInfo.user.id,
						password: this.passwordForm.pass
					}, () => {
						this.$success({
							title: "提示",
							content: "密码修改成功",
							okText: "朕知道了"
						});
						setTimeout(() => {
							util.removeLocalStorageValue(this.$common.LOCAL_STORAGE_KEY.TOKEN);
							util.removeLocalStorageValue(this.$common.LOCAL_STORAGE_KEY.ACCESS_CREDENTIAL);
							this.$router.go(0);
						}, 1000);
					});
				} else {
					console.log("密码校验失败");
					return false;
				}
			});
		},
		/**
		 * 退出登录
		 */
		exitLogin() {
			this.exitLoginVisible = false;
			this.$api.user.exitLogin(null, () => {
				this.$success({
					title: "提示",
					content: "成功退出登录",
					okText: "朕知道了"
				});
				setTimeout(() => {
					this.$util.removeLocalStorageValue(this.$common.LOCAL_STORAGE_KEY.TOKEN);
					this.$router.go(0);
				}, 1000);
			});
		}
	},
	mounted() {
		this.queryUserInfo();
	}
}
</script>

<style lang="less" scoped>
.sys {
	text-decoration: none;
	color: grey;
	font-size: small;
	margin-left: 5px;
}

.sys:hover {
	color: @primary-font-hover-color;
}

.full-height {
	height: 100%;
}

.logo {
	height: 50px;
	margin: 5px;
	line-height: 48px;
	border: 1px dashed dodgerblue;
	border-radius: 15px;
	text-align: center;
	font-size: 1.5em;
	font-weight: bold;
	color: black;
}

.logo:hover {
	cursor: pointer;
	color: @primary-font-hover-color;
}

.top-nav {
	line-height: 48px;
}
</style>
