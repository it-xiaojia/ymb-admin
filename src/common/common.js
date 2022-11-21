// 存储一些全局常量
const APP_BASE = {
	APP_NAME: "忆梦博客",
	APP_DESC: "一款轻量、简约的在线博客网站",
	SITE_OWNER: "IT小佳"
}

// 本地存储key值
const LOCAL_STORAGE_KEY = {
	TOKEN: "token",
	ACCESS_CREDENTIAL: "userAccessCredential"
}

// 账号状态
const ACCOUNT_STATUS = {
	NO_LOGIN: [1, "未登录"],
	IS_LOGIN: [2, "已登录"],
	BAN: [3, "账号封禁"]
}

// 文章状态
const ARTICLE_STATUS = {
	NO_PUBLISH: [1, "未发布"],
	PUBLISHED: [2, "已发布"]
}

// 日志级别
const LOG_LEVEL = {
	NORMAL: [1, "普通"],
	WARNING: [2, "警告"],
	ERROR: [3, "错误"]
}

export default {
	APP_BASE,
	LOCAL_STORAGE_KEY
}