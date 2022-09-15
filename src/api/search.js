import request from '@/utils/regquest'

export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/* eslint-disable */
/**
 *
 * @param {*} page 分页的页数，非必填，不填默认1
 * @param {*} per_page 每一页的数据量
 * @param {*} q 搜索关键词
 * @returns
 */
export const getResultsAPI = (page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
