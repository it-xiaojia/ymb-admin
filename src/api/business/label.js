// 文章标签API接口封装
import http from "@/api/http";

const BASE_URL = "/label/";

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

export default {
	queryObject,
	queryList,
	handleAdd,
	handleUpdate,
	handleDelete
}
