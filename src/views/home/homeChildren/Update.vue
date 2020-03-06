<template>
	<!-- 修改用户操作 -->
	<el-dialog title="修改用户" :visible.sync="isupdata" @close="adduserclear">
		<el-form :model="update" :rules="UpdataRules" ref="UpdataRef" label-width="70px">
		  <el-form-item label="用户名">
		    <el-input v-model="update.username" disabled></el-input>
		  </el-form-item>
			<el-form-item label="邮箱" prop="email">
			  <el-input v-model="update.email"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="mobile">
			  <el-input v-model="update.mobile"></el-input>
			</el-form-item>
		</el-form>
		<el-button @click="isupdates">取 消</el-button>
		<el-button type="primary" @click="UpdataInfo">确 定</el-button>
	</el-dialog>
</template>

<script>
	export default{
		name:'UpData',
		props: {
			update: {
				type: Object,
				default () {
					return []
				}
			},
			isupdata: {
				type: Boolean,
				}
		},
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
				UpdataRules: {
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
		methods:{
			isupdates() {
				this.$emit('isupdatacheng')
				console.log(update)
			},
			adduserclear(){
				this.$emit('isupdatacheng')
				this.$refs.UpdataRef.resetFields()
			},
			UpdataInfo() {
				this.$refs.UpdataRef.validate().then(res => {
					
					return this.$http.put('users/' + this.update.id,{ email:this.update.email, mobile:this.update.mobile})
				}).then(res => {						
					console.log(res)
					this.isupdates()
				}).catch(err =>{
					console.log(err)
				})
			
			}
		}
	}
</script>

<style>
</style>
