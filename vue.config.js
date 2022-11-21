const {defineConfig} = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
	transpileDependencies: true,

	devServer: {
		port: 18888
	},

	pluginOptions: {
		"style-resources-loader": {
			preProcessor: "less",
			patterns: [
				// 全局引入公共less样式
				path.resolve(__dirname, "./src/styles/base.less")
			]
		}
	},

	//关闭eslint报错和警告
	lintOnSave: false,

	// webpack配置template模式
	configureWebpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'vue$': 'vue/dist/vue.esm.js'
		}
	}
});
