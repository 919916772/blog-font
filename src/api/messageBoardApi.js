import request from '@/utils/request'
//留言板初始化
export function getAllMessages() {
  return request({
    url: '/messageBoard/getAllMessages',
    method: 'POST',
  })
}

//访客留言
export function personMessage(data) {
  return request({
    url: '/messageBoard/personMessage',
    method: 'POST',
    data
  })
}

//博主回复留言
export function replayMessage(data) {
  return request({
    url: '/messageBoard/replayMessage',
    method: 'POST',
    data
  })
}

//博主删除留言
export function deleteMessage(data) {
  return request({
    url: '/messageBoard/deleteMessage',
    method: 'DELETE',
    data
  })
}
