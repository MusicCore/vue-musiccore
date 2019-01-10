import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: 'api/userlist',
    method: 'post',
    params
  })
}

export function updateUser(data) {
  return request({
    url: 'api/userupdate',
    method: 'post',
    data
  })
}
