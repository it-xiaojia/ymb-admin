<template>
	<div style="height: 100%">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">忆梦博客</el-breadcrumb-item>
			<el-breadcrumb-item>{{ operation }}博客 - {{ renderBlogTitle }}</el-breadcrumb-item>
			<el-breadcrumb-item v-if="isSave === true || blog.id !== 0">发布日期：{{ blog.publishDate }} - 更新日期：{{
					blog.updateDate
				}}
			</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider/>
		<v-md-editor v-model="blog.section"
					 @save="handleBlog"
					 @change="isModify = true"
					 height="100%"
					 placeholder="请使用markdown语法在这里输入博客内容..."></v-md-editor>
	</div>
</template>

<script>
export default {
	name: "BlogEdit",
	data() {
		return {
			blog: {
				id: 0,
				title: "未命名",
				publishDate: null,
				updateDate: null,
				section: ""
			},
			isSave: false,
			isModify: false,
			operation: "写"
		}
	},
	methods: {
		handleBlog(blogValue) {
			if (blogValue === undefined || blogValue === null || blogValue.trim() === "") {
				this.$message.warning("博客内容不能为空");
			} else {
				this.$prompt("请输入博客标题", "博客标题", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					closeOnClickModal: false,
					inputPattern: /\S/,
					inputErrorMessage: "博客标题不能为空",
					inputValue: this.blog.title
				}).then(({value}) => {
					this.blog.title = value;
					// 如果文章已保存或者博客ID不为0，则去更新，否则去保存
					if (this.isSave || this.blog.id !== 0) {
						this.handleUpdate();
					} else {
						this.handleSave();
					}
				}).catch(() => {
				});
			}
		},
		handleSave() {
			this.$api.article.writeArticle({
				title: this.blog.title,
				section: this.blog.section
			}, () => {
				this.$message.success("博客保存成功");
				this.$api.system.getLastInsertId(null, data => {
					this.blog.id = data;
					this.isSave = true;
					this.isModify = false;
					this.handleQueryOne();
				});
			});
		},
		handleUpdate() {
			this.$api.article.updateArticle({
				articleId: this.blog.id,
				authorId: this.blog.author.id,
				title: this.blog.title,
				section: this.blog.section
			}, () => {
				this.$message.success("博客修改成功");
				this.isModify = false;
				this.handleQueryOne();
			});
		},
		handleQueryOne() {
			this.$api.article.getArticle({
				id: this.blog.id
			}, data => {
				this.blog = data;
			});
		}
	},
	computed: {
		renderBlogTitle: function () {
			if (this.blog.section.length !== 0 && this.isModify) {
				return this.blog.title + "*";
			} else {
				return this.blog.title;
			}
		}
	},
	mounted() {
		this.isModify = false;
		// 接收从其他路由传递过来的id参数
		let blogId = this.$route.query.id;
		if (blogId !== undefined && blogId !== null) {
			this.blog.id = blogId;
			this.operation = "修改";
			this.handleQueryOne();
		}
	}
}
</script>
