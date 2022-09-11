import request from '@/utils/regquest'

// 获取用户自己的频道
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
