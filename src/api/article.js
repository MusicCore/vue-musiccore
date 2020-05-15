import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue/music/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue/music/detail',
    method: 'get',
    params: { id }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue/music/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue/music/update',
    method: 'post',
    data
  })
}

export function deleteMusic(id) {
  return request({
    url: '/vue/music/musicDelete',
    method: 'POST',
    params: { id }
  })
}
