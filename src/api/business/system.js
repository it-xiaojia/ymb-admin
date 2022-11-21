// 系统API接口封装
import http from "@/api/http";

const BASE_URL = "/system/";

/**
 * 获取插入成功的数据ID
 */
function getLastInsertId(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "getLastInsertId", params, successCallBack, failCallBack);
}

export default {
	getLastInsertId
}