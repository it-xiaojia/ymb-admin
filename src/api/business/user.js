// 用户API接口封装
import http from "@/api/http";

let BASE_URL = "/user/";

/**
 * 查询一个对象
 */
function queryObject(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "queryObject", params, successCallBack, failCallBack);
}

/**
 * 查询对象列表
 */
function queryList(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "queryList", params, successCallBack, failCallBack);
}

/**
 * 新增
 */
function handleAdd(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "add", params, successCallBack, failCallBack);
}

/**
 * 更新
 */
function handleUpdate(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "update", params, successCallBack, failCallBack);
}

/**
 * 删除
 */
function handleDelete(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "delete", params, successCallBack, failCallBack);
}

/**
 * 登录
 */
function login(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "login", params, successCallBack, failCallBack);
}

/**
 * 根据token查询主页用户信息
 */
function queryIndexUserInfo(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "queryIndexUserInfo", params, successCallBack, failCallBack);
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
	queryList,
	handleAdd,
	handleUpdate,
	handleDelete,
	login,
	queryIndexUserInfo,
	updatePassword,
	exitLogin,
	resetDBStatus
}
