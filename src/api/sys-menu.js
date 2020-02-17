import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params: params
  })
}

export function fetchListNav(params) {
  return request({
    url: '/menu/nav',
    method: 'get',
    params: params
  })
}

export function infoMenu(id) {
  return request({
    url: '/menu/info/' + id,
    method: 'get',
    params: id
  })
}

export function listSimpleMenuNoButton(params) {
  return request({
    url: '/menu/listSimpleMenuNoButton',
    method: 'get',
    params: params
  })
}

export function deleteMenu(id) {
  return request({
    url: '/menu/delete/' + id,
    method: 'get'
  })
}

export function createMenu(data) {
  return request({
    url: '/menu/create',
    method: 'post',
    data: data
  })
}

export function updateMenu(id, data) {
  return request({
    url: '/menu/update/' + id,
    method: 'post',
    data: data
  })
}