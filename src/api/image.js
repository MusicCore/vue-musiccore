import request from '@/utils/request'

export function imgUpload(params) {
  return request({
    url: 'api/upload',
    method: 'post',
    data: {
      params
    },
    Headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}
