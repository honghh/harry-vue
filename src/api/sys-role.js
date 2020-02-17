import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params: params
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/role/update/status/' + id,
    method: 'post',
    params: params
  })
}

export function deleteRole(id) {
  return request({
    url: '/role/delete/' + id,
    method: 'post'
  })
}

export function updateRole(id, data) {
  return request({
    url: '/role/update/' + id,
    method: 'post',
    data: data
  })
}

export function createRole( data) {
  return request({
    url: '/role/create',
    method: 'post',
    data: data
  })
}
export function infoRole(id) {
  return request({
    url: '/role/info/' + id,
    method: 'get'
  })
}
