import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/sys/online/list',
    method: 'get',
    params: params
  })
}
