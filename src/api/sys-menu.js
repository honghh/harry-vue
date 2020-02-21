import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/sys/menu/list',
    method: 'get',
    params: params
  })
}

export function fetchListNav(params) {
  return request({
    url: '/sys/menu/nav',
    method: 'get',
    params: params
  })
}

export function infoMenu(id) {
  return request({
    url: '/sys/menu/info/' + id,
    method: 'get',
    params: id
  })
}

export function listSimpleMenuNoButton(params) {
  return request({
    url: '/sys/menu/listSimpleMenuNoButton',
    method: 'get',
    params: params
  })
}

export function deleteMenu(id) {
  return request({
    url: '/sys/menu/delete/' + id,
    method: 'delete'
  })
}

export function createMenu(data) {
  return request({
    url: '/sys/menu/create',
    method: 'post',
    data: data
  })
}

export function updateMenu(id, data) {
  return request({
    url: '/sys/menu/update/' + id,
    method: 'put',
    data: data
  })
}
