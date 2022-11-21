// 角色API接口封装
import http from "@/api/http";

const BASE_URL = "/role/";

/**
 * 获取角色列表
 */
function getRoleList(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "getRoleList", params, successCallBack, failCallBack);
}

export default {
	getRoleList
}