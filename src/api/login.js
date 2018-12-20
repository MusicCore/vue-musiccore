import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'api/login',
    method: 'post',
    data: {
      username,
      password
    },
    Headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export function getInfo(token) {
  return request({
    url: 'api/info',
    method: 'get',
    params: { token },
    Headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
