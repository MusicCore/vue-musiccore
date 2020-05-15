import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: '/api/vue/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getInfo(token, account, password) {
  return request({
    url: '/api/vue/info',
    method: 'post',
    params: { token, account, password }
  })
}

export function logout() {
  return request({
    url: '/api/vue/logout',
    method: 'post'
  })
}
