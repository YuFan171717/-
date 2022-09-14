import request from '@/utils/regquest'

// 获取用户自己的频道
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {*} id 新增频道的id
 * @param {*} seq 新增频道添加的索引值
 * @returns Promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
