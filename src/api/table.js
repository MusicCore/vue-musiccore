import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/houselist',
    method: 'get',
    params
  })
}

export function getUrl() {
  return request({
    url: '/api/getUrl',
    method: 'get'
  })
}

