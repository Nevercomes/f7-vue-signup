import request from '@/utils/request.js'

export function renderArea() {
  return request({
    url: '/a/studio/signup/statistic/map',
    method: 'get'
  })
}

export function renderSchool() {
  return request({
    url: '/a/studio/signup/statistic/school',
    method: 'get'
  })
}

export function renderPro() {
  return request({
    url: '/a/studio/signup/statistic/profession',
    method: 'get'
  })
}

export function renderYear() {
  return request({
    url: '/a/studio/signup/statistic/year',
    method: 'get'
  })
}
