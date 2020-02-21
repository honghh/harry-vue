import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/sys/config/list',
    method: 'get',
    params: params
  })
}

export function updateConfig(id, data) {
  return request({
    url: '/sys/config/update/' + id,
    method: 'put',
    data: data
  })
}

export function deleteConfig(id) {
  return request({
    url: '/sys/config/delete/' + id,
    method: 'delete'
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/sys/config/update/status/' + id,
    method: 'put',
    params: params
  })
}
