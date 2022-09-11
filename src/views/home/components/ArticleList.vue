<template>
  <div>
    <article-item
      v-for="item in Articles"
      :key="item.id"
      :article="item"
    ></article-item>
  </div>
</template>

<script>
// 发送请求,拿到当前文章的数据

// 引入请求
import { getActiclesAPI } from '@/api'

// 引入组件
import ArticleItem from './ActicleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  components: { ArticleItem },
  created() {
    this.getFirstPageArticle()
  },
  data() {
    return {
      Articles: []
    }
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getActiclesAPI(this.id, +new Date())
        this.Articles = data.data.results
      } catch (error) {
        // js的错误，上抛，400 上抛中文，507 原封不动额上抛
        if (!error.response || error.response?.status === 507) {
          throw error
        } else {
          if (error.response?.status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  },
  computed: {}
}
</script>

<style></style>
