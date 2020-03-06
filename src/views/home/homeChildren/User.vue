<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片区 -->
		<el-card>
			<el-row :gutter="20">
				<el-col :span='7'>
					<el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="GetUserLists">
						<el-button slot="append" icon="el-icon-search" @click="GetUserLists"></el-button>
					</el-input>
				</el-col>
				<el-col :span='4'>
					<el-button type="primary" @click="adduser =true">添加用户</el-button>
				</el-col>
			</el-row>

			<!-- 添加用户处理 -->
			<add-user-from :adduser="adduser" @chengaddUser="chengaddUser"></add-user-from>

			<!-- 表格搜索区 -->
			<el-table :data="UserList" border stripe style="width: 100%">
				<el-table-column type="index" label="#">
				</el-table-column>
				<el-table-column prop="username" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="email" label="邮箱">
				</el-table-column>
				<el-table-column prop="mobile" label="电话">
				</el-table-column>
				<el-table-column prop="role_name" label="角色">
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)" active-color="#13ce66"
						 inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
									
				<el-table-column prop="role_name" label="操作">
					<template slot-scope="scope">
						<el-button type="primary" content="修改用户" icon="el-icon-edit" size="mini" @click="showupdate(scope.row.id)"></el-button>
						<el-button type="danger" content="删除用户" icon="el-icon-delete" size="mini" @click="showdeleteUser(scope.row.id)"></el-button>
						<el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
							<el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			
			<!-- 修改用户操作 -->
			<up-data :update="update" :isupdata="isupdata" @isupdatacheng="isupdatacheng"></up-data>
			
			
			
			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
			 :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-card>

	</div>
</template>

<script>
	import AddUserFrom from './AddFrom.vue'
	import UpData from './Update.vue'
	export default {
		name: 'User',
		data() {
			return {
				queryInfo: {
					query: '',
					pagenum: 1,
					pagesize: 2,
				},
				total: null,
				UserList: [],
				adduser: false,
				update: {},
				isupdata: false
			}
		},
		components: {
			AddUserFrom,
			UpData,
			
		},
		//页面创建，第一次请求数据
		created() {
			this.GetUserLists()
		},
		methods: {
			//监听用户删除的操作
			showdeleteUser(id) {
					console.log(id)
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
					}).then(res =>{
						return this.$http.delete('users/' + id);			
					}).catch(err =>{
						return
					}).then(res =>{
						this.GetUserLists()
					})
			},
						
			//监听修改用户的操作
			showupdate(id) {
				console.log(id)
				this.isupdata = true;
				this.$http.get('users/' + id).then(res =>{
					this.update = res.data.data
					console.log(res)
				}).catch(err =>{
					console.log("更改用户信息失败")
				})
			},
			//监听用户更新isupdata值的改变
			isupdatacheng(){
				this.isupdata = false;
				this.GetUserLists()
			},
			
			//监听添加用户的操作
			chengaddUser() {
				this.adduser = false
				this.GetUserLists()
			},
			//监听显示数据改变
			handleSizeChange(size) {
				this.queryInfo.pagesize = size;
				this.GetUserLists()
			},
			//监听页码改变
			handleCurrentChange(page) {
				this.queryInfo.pagenum = page;
				this.GetUserLists()
			},
			//发送请求数据
			GetUserLists() {
				this.$http.get('users', {
					params: this.queryInfo
				}).then(res => {
					this.total = res.data.data.total;
					this.UserList = res.data.data.users;
				}).catch(err => {
					console.log('获取用户列表失败')
				})
			},
			//用户状态修改请求
			userStateChanged(info) {
				this.$http.put(`users/${info.id}/state/${info.mg_state}`).catch(err => {
					info.mg_state = !info.mg_state
					console.log('用户修改失败')
				})
			}
		}
	}
</script>

<style>
	.el-table {
		margin-top: 10px;
	}

	.el-pagination {
		margin-top: 15px;
	}
</style>
