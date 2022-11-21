import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 第三方引入
// ============ant-design-vue==============
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.use(Antd);

// ============VueMarkdownEditor进阶版==============
import VMdEditor from "@kangc/v-md-editor/lib/codemirror-editor";
import "@kangc/v-md-editor/lib/style/codemirror-editor.css";
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 代码高亮
import Prism from 'prismjs';

VMdEditor.use(vuepressTheme, {Prism});
// 引入代码行号插件
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

VMdEditor.use(createLineNumbertPlugin());
// 快捷复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

VMdEditor.use(createCopyCodePlugin());
// codemirror 编辑器的相关资源
import Codemirror from "codemirror";
// mode
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/vue/vue";
// edit
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
// placeholder
import "codemirror/addon/display/placeholder";
// active-line
import "codemirror/addon/selection/active-line";
// scrollbar
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/scroll/simplescrollbars.css";
// style
import "codemirror/lib/codemirror.css";

VMdEditor.Codemirror = Codemirror;
Vue.use(VMdEditor);

// Animate.css开源动画库
import "animate.css";

// 引入动态背景vue-particles
import VueParticles from "vue-particles";
Vue.use(VueParticles);

// 自定义引入
import api from "@/api/api";
import common from "@/common/common";
import util from "@/common/util";
import init from "@/api/init";

// 自定义组件
import Components from "@/components/Components";
Vue.use(Components);

// 将自定义引入挂载到原型链
Vue.prototype.$api = api;
Vue.prototype.$common = common;
Vue.prototype.$util = util;

Vue.config.productionTip = false;

let vm = new Vue({
	render: h => h(App),
	router
}).$mount("#app");

// 得到Vue实例对象
init.setContext(vm);
