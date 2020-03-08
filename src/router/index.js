import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Welcome = () => import('views/home/homeChildren/Welcome')
const User = () => import('views/home/homeChildren/User')
const Power = () => import('views/power/Power')
const Roles = () => import('views/power/Roles')
Vue.use(VueRouter);


const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/home',
		component: Home,
		redirect: './welcome',
		children: [{
				path: '/welcome',
				component: Welcome
			},
			{
				path: '/users',
				component: User
			},
			{
				path: '/rights',
				component: Power
			},
			{
				path: '/roles',
				component: Roles
			}
		]
	}
]

const router = new VueRouter({

	routes
})

//路由导航首位
router.beforeEach((to, from, next) => {
	if (to.path === '/login') return next();
	const token = window.sessionStorage.getItem('token');
	if (!token) return next('/login')
	next();
})

export default router
