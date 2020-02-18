import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params: params
  })
}

export function updateUser(id, data) {
  return request({
    url: '/sys/user/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteUser(id) {
  return request({
    url: '/sys/user/delete/' + id,
    method: 'post'
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/sys/user/update/status/' + id,
    method: 'post',
    params: params
  })
}

export function infoUser(id) {
  return request({
    url: '/sys/user/info/' + id,
    method: 'get'
  })
}

export function updatePassword(password, newPassword) {
  return request({
    url: '/sys/user/updatePassword',
    method: 'post',
    data: {
      password,
      newPassword
    }
  })
}
