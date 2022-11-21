<template>
	<div style="overflow: hidden">
		<!--背景-->
		<vue-particles class="bg"/>
		<!--内容-->
		<div>
			<header class="animate__animated animate__backInDown">
				<logo :logo-icon="logoIcon" :logo-text="appName" :logo-sub-text="appDesc"/>
			</header>
			<a-row class="animate__animated animate__backInUp">
				<a-col :span="8"></a-col>
				<a-col :span="8" class="login-form-area">
					<a-form-model :model="loginForm"
								  :rules="rules"
								  ref="loginForm"
								  class="login-form">
						<a-form-model-item prop="account">
							<a-input v-model="loginForm.account"
									 :allow-clear="true"
									 @keypress.enter="submitForm"
									 placeholder="请输入账号">
								<a-icon slot="prefix" type="user"/>
							</a-input>
						</a-form-model-item>
						<a-form-model-item prop="password">
							<a-input-password v-model="loginForm.password"
											  @keypress.enter="submitForm"
											  placeholder="请输入密码">
								<a-icon slot="prefix" type="lock"/>
							</a-input-password>
						</a-form-model-item>
						<a-form-model-item>
							<a-button type="primary" :disabled="isLogin" @click="submitForm()" class="login-button">
								<a-spin :spinning="isLogin" style="margin-right: 1em;">
									<a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
								</a-spin>
								{{ loginButtonText }}
							</a-button>
						</a-form-model-item>
					</a-form-model>
				</a-col>
				<a-col :span="8"></a-col>
			</a-row>
			<footer>
				<site-copy :site-owner="siteOwner"/>
			</footer>
		</div>
	</div>
</template>

<script>
import logoIcon from "@/assets/logo.png";

export default {
	name: "PageLogin",
	data() {
		return {
			appName: "测试标题",
			appDesc: "测试子标题",
			siteOwner: "测试作者",
			isLogin: false,
			loginButtonText: "登录",
			logoIcon: logoIcon,
			loginForm: {
				account: "",
				password: ""
			},
			rules: {
				account: [{
					required: true,
					message: "请输入账号",
					trigger: "blur"
				}],
				password: [{
					required: true,
					message: "请输入密码",
					trigger: "blur"
				}]
			},
		}
	},
	methods: {
		submitForm() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loginButtonText = "登录中";
					this.isLogin = true;
					this.$api.user.login(this.loginForm, res => {
						this.$util.setLocalStorageToken(res.data.refreshToken, res.data.accessToken);
						this.$util.setLocalStorageValue(this.$common.LOCAL_STORAGE_KEY.ACCESS_CREDENTIAL, res.data.noTokenCredential);
						this.$message.success("登录成功");
						this.$router.push("/").then();
					}, err => {
						this.$message.warn(err.message);
						this.isLogin = false;
						this.loginButtonText = "登录";
					});
				} else {
					console.log("参数校验未通过！");
					return false;
				}
			});
		}
	},
	mounted() {
		// 如果本地存储中的访问凭证不为空，删除本地存储中的访问凭证
		this.$util.removeLocalStorageValue(this.$common.LOCAL_STORAGE_KEY.ACCESS_CREDENTIAL);
		// 载入应用程序配置
		this.appName = this.$common.APP_BASE.APP_NAME;
		this.appDesc = this.$common.APP_BASE.APP_DESC;
		this.siteOwner = this.$common.APP_BASE.SITE_OWNER;
		// 测试时解开注释
		this.loginForm.account = "admin";
		this.loginForm.password = "123";
	}
}
</script>

<style lang="less" scoped>
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

.bg {
	position: fixed;
	width: 100%;
	height: 100%;
}

header, footer {
	width: 100%;
	text-align: center;
}

header {
	top: 1em;
}

.login-form-area {
	display: flex;
	justify-content: center;
}

.login-form {
	width: 80%;
	margin-top: 2em;
}

.login-button {
	width: 100%;
	height: 3em;
}

footer {
	position: absolute;
	bottom: 0;
	padding: 1em 0;
}
</style>
