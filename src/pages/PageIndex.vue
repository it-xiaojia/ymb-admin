<!--主页面框架-->
<template>
	<div class="full-height">
		<a-layout style="min-height: 100vh">
			<!--侧边栏-->
			<a-layout-sider style="background-color: white">
				<!--文字logo-->
				<div class="logo animate__animated animate__backInLeft">
					忆梦博客-管理端
				</div>
				<!--侧边菜单（二级菜单）-->
				<a-menu mode="inline" :default-selected-keys="defaultSelectMenuKey.level2Key">
					<a-menu-item key="k1">
						<a-icon type="setting"/>
						<span>字典管理</span>
					</a-menu-item>
					<a-menu-item key="k2">
						<a-icon type="setting"/>
						<span>日志查询</span>
					</a-menu-item>
					<a-menu-item key="k3">
						<a-icon type="setting"/>
						<span>数据配置</span>
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
							<a-menu v-model="defaultSelectMenuKey.level1Key" mode="horizontal">
								<a-menu-item key="dev">
									<a-icon type="appstore"/>
									开发管理
								</a-menu-item>
								<a-menu-item key="system">
									<a-icon type="appstore"/>
									系统管理
								</a-menu-item>
								<a-menu-item key="blog">
									<a-icon type="appstore"/>
									博客管理
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
						<!--TODO 测试用（模拟菜单单击）-->
						<div :style="{ marginBottom: '16px' }">
							<a-button @click="add">
								ADD
							</a-button>
						</div>
						<!--选项卡区域-->
						<a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit">
							<!--选项卡-->
							<a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title"
										:closable="pane.closable">
								{{ pane.content }}
							</a-tab-pane>
							<!--快捷关闭选项卡页面功能区域-->
							<a-popover v-model="visible" trigger="click" slot="tabBarExtraContent"
									   placement="bottomRight">
								<template slot="content">
									<a @click="hide">仪表盘</a>
									<br/>
									<a-button type="primary" @click="hide" style="margin-top: 1em">关闭所有</a-button>
								</template>
								<a-icon type="setting" class="close-all"/>
							</a-popover>
						</a-tabs>
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
		const panes = [
			{title: '仪表盘', content: '仪表盘内容', key: '1', closable: false},
			{title: '字典管理', content: 'Content of Tab 2', key: '2'},
		];
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
				level1Key: ['dev'],
				// 二级菜单
				level2Key: ['k1']
			},
			visible: false,
			activeKey: panes[0].key,
			panes,
			newTabIndex: 0,
			current: ['mail'],
			level1Title: "忆梦博客",
			level2Title: "仪表盘",
			passwordForm: {
				pass: "",
				checkPass: "",
			},
			rules: {
				pass: [{validator: validatePass, trigger: "change"}],
				checkPass: [{validator: validatePass2, trigger: "change"}]
			},
			updatePasswordVisible: false,
			exitLoginVisible: false,
			userInfo: {
				user: {},
				roleName: "未知角色",
				level1AuthList: [],
				level2AuthList: []
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
			});
		},
		/**
		 * 根据父权限ID查询角色所拥有的单级权限菜单
		 * @param parentAuthId 父权限ID
		 */
		queryRoleAuthMenu(parentAuthId) {

		},
		hide() {
			this.visible = false;
		},
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
		},
		toUrl(item) {
			// console.log(item);
			// keyInfo为逗号分割，下标含义：0：key值，1：url，2：一级菜单标题，3：二级菜单标题
			let keyInfo = item.key.split(",");
			// 一级菜单
			if (keyInfo.length === 3) {
				this.level1Title = "忆梦博客";
				this.level2Title = keyInfo[2];
			}
			// 二级菜单
			// 如果为三级菜单及以上，则只显示当前选中菜单及上一级菜单的名称
			if (keyInfo.length === 4) {
				this.level1Title = keyInfo[2];
				this.level2Title = keyInfo[3];
			}
			// 获取跳转的目标路由
			let targetRoute = item.key.split(",")[1];
			// 点击菜单项后跳转路由
			// 当当前页面路由和目标路由不相等时发起路由跳转，防止重复点击引发路由重复跳转报错
			if (this.$route.path !== targetRoute) {
				this.$router.push(item.key.split(",")[1]);
			}
		},
		onEdit(targetKey, action) {
			this[action](targetKey);
		},
		add() {
			const panes = this.panes;
			const activeKey = `newTab${this.newTabIndex++}`;
			panes.push({
				title: `New Tab ${activeKey}`,
				content: `Content of new Tab ${activeKey}`,
				key: activeKey,
			});
			this.panes = panes;
			this.activeKey = activeKey;
		},
		remove(targetKey) {
			let activeKey = this.activeKey;
			let lastIndex;
			this.panes.forEach((pane, i) => {
				if (pane.key === targetKey) {
					lastIndex = i - 1;
				}
			});
			const panes = this.panes.filter(pane => pane.key !== targetKey);
			if (panes.length && activeKey === targetKey) {
				if (lastIndex >= 0) {
					activeKey = panes[lastIndex].key;
				} else {
					activeKey = panes[0].key;
				}
			}
			this.panes = panes;
			this.activeKey = activeKey;
		},
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
	color: deepskyblue;
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

.top-nav {
	line-height: 48px;
}

.close-all:hover {
	//color: #1890ff;
	color: @primary-font-hover-color;
	cursor: pointer;
}
</style>
