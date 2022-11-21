// 用户API接口封装
import http from "@/api/http";

const BASE_URL = "/user/";

/**
 * 获取用户信息
 */
function queryObject(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "queryObject", params, successCallBack, failCallBack);
}

/**
 * 登录
 */
function login(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "login", params, successCallBack, failCallBack);
}

/**
 * 修改用户密码
 */
function updatePassword(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "updatePassword", params, successCallBack, failCallBack);
}

/**
 * 退出登录
 */
function exitLogin(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "exitLogin", params, successCallBack, failCallBack);
}

/**
 * 让服务端将数据库存储的用户状态修改为未登录状态
 */
function resetDBStatus(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "resetDBStatus", params, successCallBack, failCallBack);
}

export default {
	queryObject,
	login,
	updatePassword,
	exitLogin,
	resetDBStatus
}
