// 封装axios
import axios from "axios";
import init from "@/api/init";
import util from "@/common/util";
import common from "@/common/common";
import user from "@/api/business/user";

/**
 * HTTP状态码，同后端定义
 */
const httpStatus = {
	OK: 200,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
}

/**
 * 业务状态码，同后端定义
 */
const businessStatus = {
	SUCCESS: 200,
	FORBIDDEN: 403,
	FAIL: 404,
}

/**
 * HTTP响应代码
 */
const responseCode = {
	// 请求超时
	REQUEST_TIMEOUT: "ECONNABORTED",
	// 服务端无响应
	NO_RESPONSE: "ERR_NETWORK"
}

/**
 * 根据配置文件自动选择对应的环境URL（除了无后端环境）
 */
console.log("当前环境：", process.env.VUE_APP_ENV_DESC);
console.log("URL：", process.env.VUE_APP_BASE_URL);
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

/**
 * 设置超时时间
 */
axios.defaults.timeout = 10000;

/**
 * 设置请求拦截器
 */
axios.interceptors.request.use(config => {
	let token = util.getLocalStorageValue(common.LOCAL_STORAGE_KEY.TOKEN);
	token && (config.headers.Authentication = token);
	return config;
}, error => {
	return Promise.reject(error);
});

/**
 * 设置响应拦截器
 */
axios.interceptors.response.use(response => {
	// 成功后将数据响应回去
	return response.data;
}, error => {
	let context = init.getContext();
	switch (error.code) {
		case responseCode.REQUEST_TIMEOUT:
			context.$message.error("请求超时");
			break;
		case responseCode.NO_RESPONSE:
			context.$message.error("服务器无响应");
			break;
	}
	let {response} = error;
	if (response) {
		let accessCredential;
		// 根据服务器的错误返回结果执行不同的操作
		switch (response.status) {
			// 权限未校验重定向去登录界面
			case httpStatus.UNAUTHORIZED:
				context.$message.warning("权限未校验，将跳转去登录界面");
				util.removeLocalStorageValue(common.LOCAL_STORAGE_KEY.TOKEN);
				// 如果用户ID不为空，将用户ID传给服务端让服务端将数据库存储的用户状态修改为未登录状态
				accessCredential = util.getLocalStorageValue(common.LOCAL_STORAGE_KEY.ACCESS_CREDENTIAL);
				if (util.isStringNotNull(accessCredential)) {
					user.resetDBStatus({
						credential: accessCredential
					}, data => {
						console.log(data.message);
					}, err => {
						console.log(err.message);
					});
				}
				context.$router.go(0);
				break;
			case httpStatus.NOT_FOUND:
				// 去404页面
				console.log("请求的资源不存在，去404页面");
				break;
			case httpStatus.INTERNAL_SERVER_ERROR:
				console.log(error);
				context.$message.error("发生了点小意外，清稍后重试");
				break;
		}
	} else {
		// 服务器无结果返回
		if (!window.navigator.onLine) {
			// 断网处理
			console.log("网络连接中断，去断网页面");
		}
		return Promise.reject(error);
	}
});

/**
 * 通用的请求方法
 *
 * @param url 请求URL
 * @param params 参数
 * @param successCallBack 成功的回调函数
 * @param failCallBack 失败的回调函数
 */
function request(url, params, successCallBack, failCallBack) {
	axios({
		method: "post",
		url: url,
		data: params
	}).then(res => {
		if (res !== undefined) {
			switch (res.code) {
				// 请求成功
				case businessStatus.SUCCESS:
					successCallBack(res);
					break;
				// 需要重新校验权限
				case businessStatus.FORBIDDEN:
					// 删除本地存储中的token
					util.removeLocalStorageValue(common.LOCAL_STORAGE_KEY.TOKEN);
					// 重新设置本地存储中的token
					util.setLocalStorageToken(res.data.refreshToken, res.data.accessToken);
					// 重新发起当前的请求
					request(url, params, successCallBack, failCallBack);
					break;
				// 请求失败
				case businessStatus.FAIL:
					// 如果失败的回调没有传，则直接提示失败信息
					if (failCallBack === undefined || failCallBack === null) {
						init.getContext().$message.warn(res.message);
					} else {
						failCallBack(res);
					}
					break;
			}
		}
	});
}

export default {
	request
};
