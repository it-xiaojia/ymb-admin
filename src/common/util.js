// 封装一些常用的工具类
import common from "@/common/common";

/**
 * 获取本地存储中的值
 * @param localStorageKey key
 * @returns {string} 返回本地存储中的值
 */
function getLocalStorageValue(localStorageKey) {
	return localStorage.getItem(localStorageKey);
}

/**
 * 给本地存储存值
 *
 * @param localStorageKey key
 * @param localStorageValue value
 */
function setLocalStorageValue(localStorageKey, localStorageValue) {
	if (!isStringNotNull(localStorage.getItem(localStorageKey))) {
		localStorage.setItem(localStorageKey, localStorageValue);
		console.log("成功给本地存储中存入：key=" + localStorageKey + "\tvalue=" + localStorageValue);
	}
}

/**
 * 移除session中的token
 * @param localStorageKey key
 */
function removeLocalStorageValue(localStorageKey) {
	if (isStringNotNull(getLocalStorageValue(localStorageKey))) {
		localStorage.removeItem(localStorageKey);
		console.log("成功将" + localStorageKey + "从本地存储中移除");
	}
}

/**
 * 如果本地存储中没有token，则将服务端提供的双token以@符连接并存入本地存储中，
 *
 * @param refreshToken 服务端提供的refreshToken
 * @param accessToken 服务端提供的accessToken
 */
function setLocalStorageToken(refreshToken, accessToken) {
	if (isStringNotNull(refreshToken)
		&& isStringNotNull(accessToken)
		&& !isStringNotNull(getLocalStorageValue(common.LOCAL_STORAGE_KEY.TOKEN))) {
		// 携带token，前面加上Bearer，为了与api-post测试工具同步
		localStorage.setItem(common.LOCAL_STORAGE_KEY.TOKEN, "Bearer " + refreshToken + "@" + accessToken);
		console.log("成功给本地存储中存入token");
	}
}

/**
 * 判断一个字符串是否不为空
 * @param str
 * @returns {boolean}
 */
function isStringNotNull(str) {
	return str !== undefined && str !== null && str.trim() !== "";
}

function isNumberNotZero(num) {
	return num !== undefined && num !== null && num !== 0;
}

export default {
	getLocalStorageValue,
	setLocalStorageValue,
	removeLocalStorageValue,
	setLocalStorageToken,
	isStringNotNull,
	isNumberNotZero
}