<!--入口组件文件-->
<script>
import NoSelectFont from "@/components/NoSelectFont";
import SiteCopy from "@/components/SiteCopy";
import Logo from "@/components/Logo";

export default {
	name: "Components",
	install(Vue) {
		Vue.component("NoSelectFont", NoSelectFont);
		Vue.component("SiteCopy", SiteCopy);
		Vue.component("Logo", Logo);
	}
}
</script>