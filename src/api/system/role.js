import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params: query
  })
}

// 查询所有角色列表
export function listAllRole() {
  return request({
    url: '/sys/role/listAll',
    method: 'get'
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/sys/role/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/sys/role/create',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(roleId,data) {
  return request({
    url: '/sys/role/update/' + roleId,
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(roleId,data) {
  return request({
    url: '/sys/role/dataScope/' + roleId,
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/sys/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: '/sys/role/delete/' + roleId,
    method: 'delete'
  })
}

// 导出角色
export function exportRole(query) {
  return request({
    url: '/sys/role/export',
    method: 'get',
    responseType:'blob',
    params: query
  })
}
