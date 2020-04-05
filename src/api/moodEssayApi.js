import request from '@/utils/request'
//随笔初始化
export function getAllMessages() {
  return request({
    url: '/moodEssay/getAllMoodEssay',
    method: 'POST',
  })
}

//随笔保存
export function moodEssaySave(data) {
  return request({
    url: '/moodEssay/moodEssaySave',
    method: 'POST',
    data
  })
}

//随笔删除
export function moodEssayDel(data) {
  return request({
    url: '/moodEssay/moodEssayDel',
    method: 'DELETE',
    data
  })
}
