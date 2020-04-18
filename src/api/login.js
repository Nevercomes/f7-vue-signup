import request from '@/utils/request'

export function login(info) {
  return request({
    url: '/a/login',
    method: 'post',
    params: info
  })
}

export function wxLogin(param) {
  return request({
    url: '/a/login',
    method: 'get',
    params: param
  })
}

export function toRedirect(params) {
  return request({
    url: '/f/signup/snsapi',
    method: 'get',
    params: params
  })
}
