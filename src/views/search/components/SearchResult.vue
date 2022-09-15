<template>
  <div class="result">
    <van-list
      @load="getResults"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      />
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  created() {},
  data() {
    return {
      loading: false,
      page: 1,
      per_page: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    // 获取数据和下一页数据
    async getResults() {
      try {
        // 测试代码
        // if (Math.random() < 0.5) {
        // throw new Error()
        // }

        // 发送请求
        const { data } = await getResultsAPI(
          // 每一次调用page++
          this.page++,
          this.per_page,
          this.keywords
        )
        const result = data.data.results
        if (result.length === 0) {
          this.finished = true
        } // 保存数据 // this.results.push(data.data.results) // 这个不是替换 是追加
        this.results = [...this.results, ...result]
      } catch {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  },
  computed: {}
}
</script>

<style scoped lang="less">
.result {
  // overflow: auto 和 overflow:overlay  用法差不多
  height: calc(100vh - 110px);
  overflow: auto;
  padding-bottom: 60px;
}
</style>
