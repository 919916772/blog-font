import request from '@/utils/request'

export function adminLogin(data) {
  return request({
    url: '/person/adminLogin',
    method: 'POST',
    data
  })
}
