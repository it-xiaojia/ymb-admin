<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">忆梦博客</el-breadcrumb-item>
			<el-breadcrumb-item>文章管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider/>
		<!-- 搜索栏 -->
		<el-form :inline="true" :model="queryForm" class="demo-form-inline">
			<el-form-item>
				<el-input v-model="queryForm.title" placeholder="请输入文章标题" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
				<el-button type="primary" icon="el-icon-edit" @click="toEdit">写文章</el-button>
			</el-form-item>
		</el-form>
		<el-table
				:data="tableData"
				style="width: 100%">
			<el-table-column
					prop="id"
					label="ID">
			</el-table-column>
			<el-table-column
					prop="title"
					label="标题">
			</el-table-column>
			<el-table-column
					prop="publishDate"
					sortable
					label="发布日期">
			</el-table-column>
			<el-table-column
					prop="updateDate"
					sortable
					label="更新日期">
			</el-table-column>
			<el-table-column
					label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="text" style="color: #f56c6c;" size="small" @click="handleDelete(scope.row)">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
				style="position: absolute; bottom: 3%; left: 50%"
				layout="prev, pager, next"
				@current-change="handleCurrentChange"
				:page-size="queryForm.pageSize"
				:current-page="queryForm.currentPage"
				:total="total">
		</el-pagination>
	</div>
</template>

<script>
export default {
	name: "BlogManage",
	data() {
		return {
			queryForm: {
				currentPage: 1,
				pageSize: 6,
				title: ""
			},
			tableData: [],
			total: 0
		}
	},
	methods: {
		toEdit() {
			this.$router.push("/edit");
		},
		handleQuery() {
			this.$api.article.getArticleList(this.queryForm, data => {
				this.tableData = data.rows;
				this.total = data.total;
			});
		},
		handleCurrentChange(currentPage) {
			this.queryForm.currentPage = currentPage;
			this.handleQuery();
		},
		handleEdit(row) {
			this.$router.push({
				path: '/edit',
				query: {
					id: row.id
				}
			})
		},
		handleDelete(row) {
			this.$confirm("确定要删除ID为" + row.id + "的博客吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				this.$api.article.deleteArticle({
					articleId: row.id,
					authorId: row.author.id
				}, data => {
					this.$message.success(data.message);
					this.handleQuery();
				});
			}).catch(() => {
			});
		}
	},
	mounted() {
		this.handleQuery();
	}
}
</script>

<style scoped>

</style>
