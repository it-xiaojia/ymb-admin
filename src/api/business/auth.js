// 权限API接口封装
import http from "@/api/http";

const BASE_URL = "/auth/";

/**
 * 获取权限列表
 */
function getAuthList(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "getAuthList", params, successCallBack, failCallBack);
}

/**
 * 新增权限
 */
function addAuth(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "addAuth/", params, successCallBack, failCallBack);
}

/**
 * 通过权限ID查询权限信息
 */
function getAuthById(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "getAuthById/", params, successCallBack, failCallBack);
}

/**
 * 修改权限
 */
function updateAuth(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "updateAuth", params, successCallBack, failCallBack);
}

/**
 * 删除权限
 */
function deleteAuth(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "deleteAuth", params, successCallBack, failCallBack);
}

export default {
	getAuthList,
	addAuth,
	getAuthById,
	updateAuth,
	deleteAuth
}