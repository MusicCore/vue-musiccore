import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: 'api/login',
    method: 'post',
    data: {
      account,
      password
    },
    Headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export function getInfo(token, account, password) {
  return request({
    url: 'api/info',
    method: 'post',
    params: { token, account, password },
    Headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export function logout() {
  return request({
    url: 'api/loginOut',
    method: 'post'
  })
}
