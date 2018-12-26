import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: 'api/userlist',
    method: 'get',
    params
  })
}

export function updateUser(params) {
  return request({
    url: 'api/userlist',
    method: 'get',
    params
  })
}
