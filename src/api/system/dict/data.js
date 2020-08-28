import request from '@/utils/request'

// 查询字典数据列表
export function listData(query) {
  return request({
    url: '/sys/dict/detail/list',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/sys/dict/detail/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/sys/dict/detail/dictType/' + dictType,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/sys/dict/detail/create',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(id,data) {
  return request({
    url: '/sys/dict/detail/update/' + id,
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: '/sys/dict/detail/deleteByIds/' + dictCode,
    method: 'delete'
  })
}

// 导出字典数据
export function exportData(query) {
  return request({
    url: '/sys/dict/detail/export',
    method: 'get',
    responseType:'blob',
    params: query
  })
}
