import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params: params
  })
}

export function infoUser(id) {
  return request({
    url: '/sys/user/info/' + id,
    method: 'get'
  })
}

export function updateUser(id, data) {
  return request({
    url: '/sys/user/update/' + id,
    method: 'put',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/sys/user/update/status/' + id,
    method: 'put',
    params: params
  })
}

export function updatePassword(password, newPassword) {
  return request({
    url: '/sys/user/updatePassword',
    method: 'put',
    data: {
      password,
      newPassword
    }
  })
}

export function deleteUser(id) {
  return request({
    url: '/sys/user/delete/' + id,
    method: 'delete'
  })
}
