import Vue from "vue";
import Router from "vue-router";
import common from "@/common/common";
import util from "@/common/util";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: "/",
			name: "PageIndex",
			component: () => import("@/pages/PageIndex"),
			redirect: "/dashboard",
			children: [
				{
					path: "dashboard",
					name: "Dashboard",
					component: () => import("@/pages/Dashboard")
				},
				{
					path: "article",
					name: "ArticleManage",
					component: () => import("@/pages/blog/article/ArticleManage")
				},
				{
					path: "edit",
					name: "ArticleEdit",
					component: () => import("@/pages/blog/article/ArticleEdit")
				},
				{
					path: "category",
					name: "CategoryManage",
					component: () => import("@/pages/blog/category/CategoryManage")
				},
				{
					path: "label",
					name: "LabelManage",
					component: () => import("@/pages/blog/label/LabelManage")
				},
				{
					path: "log",
					name: "LogManage",
					component: () => import("@/pages/develop/log/LogManage")
				},
				{
					path: "auth",
					name: "AuthManage",
					component: () => import("@/pages/system/auth/AuthManage")
				},
				{
					path: "role",
					name: "RoleManage",
					component: () => import("@/pages/system/role/RoleManage")
				},
				{
					path: "user",
					name: "UserManage",
					component: () => import("@/pages/system/user/UserManage")
				},
			]
		},
		{
			path: "/login",
			name: "PageLogin",
			component: () => import("@/pages/PageLogin")
		},
	]
});

// 如果当前环境是不是无服务环境，则进行路由拦截
router.beforeEach(function (to, from, next) {
	// 如果本地存储中的token值为空，则去登录界面
	let token = util.getLocalStorageValue(common.LOCAL_STORAGE_KEY.TOKEN);
	if (!util.isStringNotNull(token)) {
		if (to.path !== '/login') {
			return next('/login')
		}
	}
	next()
})

export default router;
