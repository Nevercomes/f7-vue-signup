import request from '@/utils/request'

export function login(info) {
  return request({
    url: '/a/login',
    method: 'post',
    params: info
  })
}
