import request from '@/utils/request.js'

export function getSchools(shopId) {
  return request({
    url: '/f/school/list',
    method: 'get',
    params: {
      shopId: shopId,
    }
  })
}

export function getClassTypes(shopId) {
  return request({
    url: '/f/classType/list',
    method: 'get',
    params: {
      shopId: shopId
    }
  })
}

export function getPros(shopId) {
  return request({
    url: '/f/professnal/list',
    method: 'get',
    params: {
      shopId: shopId
    }
  })
}

export function saveSignup(data) {
  return request({
    url: '/f/signup',
    method: 'post',
    data: data
  })
}

export function updateSignup(data) {
  return request({
    url: '/f/signup/update',
    method: 'put',
    data: data
  })
}

export function getSignup(id) {
  return request({
    url: '/f/signup/get',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function listSignup(query) {
  return request({
    url: '/f/signup/list',
    method: 'get',
    params: query
  })
}
