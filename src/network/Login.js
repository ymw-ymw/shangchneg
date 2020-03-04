import request from './index.js'
export function postlogin(username,password) {
  return request({
    url: '/login',
		params: {
			username,
		  password
		}
  })
}