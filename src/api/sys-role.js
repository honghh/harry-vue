import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/sys/role/create',
    method: 'post',
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/sys/role/update/' + id,
    method: 'put',
    data: data
  })
}

export function deleteRole(id) {
  return request({
    url: '/sys/role/delete/' + id,
    method: 'delete'
  })
}

export function infoRole(id) {
  return request({
    url: '/sys/role/info/' + id,
    method: 'get'
  })
}
