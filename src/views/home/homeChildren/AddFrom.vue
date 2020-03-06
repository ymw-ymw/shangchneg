<template>
	<el-dialog title="添加用户" :visible.sync="adduser" width="30%" @close="adduserclear">
		<el-form :model="addForm" :rules="addFormRules" ref="addFormref">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="addForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="addForm.password"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="addForm.email"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="mobile">
				<el-input v-model="addForm.mobile"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer">
			<el-button @click="addusers">取 消</el-button>
			<el-button type="primary" @click="addnewuser">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		name: "AddFrom",
		data() {
			var checkEmail = (rule, value, cb) => {
				// 验证邮箱的正则表达式
				const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
				if (regEmail.test(value)) {
					// 合法的邮箱
					return cb()
				}
				cb(new Error('请输入合法的邮箱'))
			}
			// 验证手机号的规则
			var checkMobile = (rule, value, cb) => {
				// 验证手机号的正则表达式
				const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

				if (regMobile.test(value)) {
					return cb()
				}
				cb(new Error('请输入合法的手机号'))
			}
			return {
				addForm: {
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				addFormRules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '用户名的长度在3~10个字符之间',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 15,
							message: '用户名的长度在6~15个字符之间',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							validator: checkEmail,
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					]
				}

			}
		},
		props: {
			adduser: {
				type: Boolean,
				default () {
					return []
				}
			}
		},
		methods: {
			//发送事件，是否显示对话框
			addusers() {
				this.$emit('chengaddUser')
			},
			//关闭表单，清除表单
			adduserclear() {
				this.$emit('chengaddUser')
				this.$refs.addFormref.resetFields()
			},
			//添加新的用户，发送请求
			addnewuser() {
				this.$refs.addFormref.validate().then(res => {
					return this.$http.post('users', this.addForm)

				}).then(res => {

					this.addusers()
				})

			}
		}
	}
</script>

<style>

</style>
