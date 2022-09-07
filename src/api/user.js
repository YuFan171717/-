// user.js 划分是根据后端接口文档
import request from '@/utils/regquest'

/**
 *
 * @returns Promise 手机和校验码
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

// 发送验证码
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
