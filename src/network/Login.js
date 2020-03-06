import request from './request.js'
export function postlogin(username,password) {
  return request({
    url: '/login',
		params: {
			username,
		  password
		}
  })
}

