export let addFormRules = {
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
 