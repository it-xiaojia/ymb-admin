// 文章API接口封装
import http from "@/api/http";

const BASE_URL = "/article/";

/**
 * 获取文章列表
 */
function getArticleList(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "getArticleList", params, successCallBack, failCallBack);
}

/**
 * 查询一篇文章
 */
function getArticle(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "getArticle", params, successCallBack, failCallBack);
}

/**
 * 写文章
 */
function writeArticle(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "writeArticle", params, successCallBack, failCallBack);
}

/**
 * 修改文章
 */
function updateArticle(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "updateArticle", params, successCallBack, failCallBack);
}

/**
 * 删除文章
 */
function deleteArticle(params, successCallBack, failCallBack) {
	http.request(BASE_URL + "deleteArticle", params, successCallBack, failCallBack);
}

export default {
	getArticleList,
	getArticle,
	writeArticle,
	updateArticle,
	deleteArticle
}