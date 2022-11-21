<template>
	<div class="full-height">
		<a-layout style="min-height: 100vh">
			<a-layout-sider style="background-color: white">
				<div class="logo animate__animated animate__backInLeft">
					忆梦博客-管理端
				</div>
				<a-menu mode="inline" :default-selected-keys="['1,/index,仪表盘']" @click="toUrl"
						:inline-collapsed="collapsed">
					<template v-for="item in userInfo.authMenuList">
						<a-menu-item v-if="item.children.length === 0" :key="getKey(item.key, item.url, item.title)">
							<a-icon :type="item.iconType"/>
							<span>{{ item.title }}</span>
						</a-menu-item>
						<sub-menu v-else :key="getKey(item.key, item.url, item.title)" :menu-info="item"/>
					</template>
				</a-menu>
			</a-layout-sider>
			<a-layout>
				<a-layout-header style="background: #fff; padding: 0; border-radius: 5px;"
								 class="top-nav animate__animated animate__backInRight">
					<a-row style="margin-top: 0.5em">
						<a-col :span="14" style="padding-left: 1em">
							<a-menu v-model="current" mode="horizontal">
								<a-menu-item key="mail">
									<a-icon type="mail"/>
									管理系统
								</a-menu-item>
								<a-menu-item key="app">
									<a-icon type="appstore"/>
									接入管理
								</a-menu-item>
								<a-menu-item key="alipay">
									<a-icon type="appstore"/>
									服务管理
								</a-menu-item>
							</a-menu>
						</a-col>
						<a-col :span="10" style="text-align: right;padding-right: 24px">
							<no-select-font style="margin-right: 5px;font-size: 0.8em"
											:text="'你好！' + userInfo.userRole.name + '-' + userInfo.username"/>
							<a href="#" @click.prevent="updatePasswordVisible = true" class="sys">[修改密码]</a>
							<a href="#" @click.prevent="exitLoginVisible = true" class="sys">[退出登录]</a>
						</a-col>
					</a-row>
				</a-layout-header>
				<a-layout-content style="margin: 0 16px">
					<div :style="{ padding: '1em', background: '#fff', minHeight: '98%', marginTop: '0.5em' }">
						<div :style="{ marginBottom: '16px' }">
							<a-button @click="add">
								ADD
							</a-button>
						</div>
						<a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit">
							<a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
								{{ pane.content }}
							</a-tab-pane>
							<a-popover v-model="visible" trigger="click" slot="tabBarExtraContent" placement="bottomRight">
								<template slot="content">
									<a @click="hide">仪表盘</a>
									<br/>
									<a-button type="primary" @click="hide" style="margin-top: 1em">关闭所有</a-button>
								</template>
								<a-icon type="setting" class="close-all" />
							</a-popover>
						</a-tabs>
					</div>
				</a-layout-content>
			</a-layout>
		</a-layout>
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
import logoIcon from "@/assets/logo.png";
import util from "@/common/util";
import {Menu} from 'ant-design-vue';

const SubMenu = {
	template: `
		<a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
		<span slot="title">
          <a-icon :type="menuInfo.iconType"/><span>{{ menuInfo.title }}</span>
        </span>
		<template v-for="item in menuInfo.children">
			<a-menu-item v-if="item.children.length === 0"
						 :key="getKey(item.key, item.url, menuInfo.title, item.title)">
				<a-icon :type="item.iconType"/>
				<span>{{ item.title }}</span>
			</a-menu-item>
			<sub-menu v-else :key="getKey(item.key, item.url, menuInfo.title, item.title)" :menu-info="item"/>
		</template>
		</a-sub-menu>
	`,
	name: "SubMenu",
	// must add isSubMenu: true
	isSubMenu: true,
	props: {
		...Menu.SubMenu.props,
		// Cannot overlap with properties within Menu.SubMenu.props
		menuInfo: {
			type: Object,
			default: () => ({}),
		},
	},
	methods: {
		getKey(key, url, menuInfoTitle, itemTitle) {
			return key + "," + url + "," + menuInfoTitle + "," + itemTitle;
		}
	}
};
export default {
	components: {
		"sub-menu": SubMenu,
	},
	name: "BlogIndex",
	data() {
		const panes = [
			{ title: '仪表盘', content: '仪表盘内容', key: '1', closable: false },
			{ title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
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
			visible: false,
			activeKey: panes[0].key,
			panes,
			newTabIndex: 0,
			collapsed: false,
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
			logoIcon: logoIcon,
			userInfo: {
				id: 0,
				username: "未登录用户",
				userRole: {},
				authMenuList: []
			},
		}
	},
	methods: {
		hide() {
			console.log(111);
			this.visible = false;
		},
		updatePassword(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$api.user.updateUserPassword({
						userId: this.userInfo.id,
						password: this.passwordForm.pass
					}, res => {
						this.$success({
							title: "提示",
							content: res.message,
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
		getUserInfo() {
			this.$api.user.getUserInfo({id: 0}, res => {
				this.userInfo = res.data;
			});
		},
		exitLogin() {
			this.exitLoginVisible = false;
			this.$api.user.exitLogin(null, res => {
				this.$success({
					title: "提示",
					content: res.message,
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
		getKey(key, url, title) {
			return key + "," + url + "," + title;
		},
		toggleCollapsed() {
			this.collapsed = !this.collapsed;
		},
		callback(key) {
			console.log(key);
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
		this.getUserInfo();
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
