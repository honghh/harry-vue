import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/harry";

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/sys/user/info/' + praseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/sys/user/create',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(userId,data) {
  return request({
    url: '/sys/user/update/' + userId,
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/sys/user/deleteByIds/' + userId,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: '/sys/user/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(id, password) {
  const data = {
    id,
    password
  }
  return request({
    url: '/sys/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const params = {
    status
  }
  return request({
    url: '/sys/user/update/status/' + userId,
    method: 'put',
    params: params
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/sys/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/sys/user/profile/update',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(password, newPassword) {
  const data = {
    password,
    newPassword
  }
  return request({
    url: '/sys/user/profile/updatePassword',
    method: 'put',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/sys/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/sys/user/importTemplate',
    method: 'get'
  })
}
