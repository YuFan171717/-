// 所有有关于新闻的借口

import request from '@/utils/regquest'

/**
 *请求文章
 * @param {String | Number} id
 * @param {Number}  timestamp
 * @returns Promise
 */
export const getActiclesAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
