import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: 'api/vue/userlist',
    method: 'post',
    params
  })
}

export function updateUser(data) {
  return request({
    url: 'api/vue/userupdate',
    method: 'post',
    data
  })
}
