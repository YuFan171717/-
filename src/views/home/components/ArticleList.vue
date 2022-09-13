<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @load：触底的时候触发load事件 -->
    <!-- offset:规定滚动条和底部距离多少的时候触发loda事件，默认是300px -->
    <!-- immediate-check:初渲染的时候是否执行load事件，默认值是true -->
    <!-- v-model去绑定loading v-model="loading" -->
    <!-- loading如果为true，load事件不会被触发 -->
    <!-- loading如果为false，load事件会被触发 -->
    <!-- loading 会在load事件执行后，会被van-list组件自动设置为true-->
    <!-- finished:布尔值，false load事件会触发，ture不会，并会显示finished-text的文本 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多啦~"
        :error.sync="error"
        error-text="请求失败，请重新加载~"
      >
        <article-item
          v-for="item in Articles"
          :key="item.id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
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
      Articles: [],
      preTimetamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getActiclesAPI(this.id, +new Date())
        this.Articles = data.data.results
        // 保存下一页的时间戳，用于分页
        this.preTimetamp = data.data.pre_timestamp
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
    },

    async getNextPageArticle() {
      // 发送请求获取下一页文章
      try {
        // 错误测试
        // if (Math.random() < 0.5) {
        //   throw new Error('错误')
        // }
        const { data } = await getActiclesAPI(this.id, this.preTimetamp) // 添加到articles
        if (!data.data.pre_timestamp) {
          // 如果没有下一页的时间戳了，取反为true后 不在触发load事件
          this.finished = true
        }

        // 如果this.loading 是true 那么代表再下拉加载，否则是上滑刷新
        if (this.loading) {
          this.Articles.push(...data.data.results)
        } else {
          this.Articles.unshift(...data.data.results)
        }
        // 更新时间戳
        this.preTimetamp = data.data.pre_timestamp // 更改loading
      } catch (error) {
        this.error = true
      } finally {
        // finally  无论是try还是catch 最后都会执行finally
        this.loading = false
        this.refreshLoading = false
      }
    }
  },
  computed: {}
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  // 定高,然后设置滚动条 overflow:auto || scroll || overlay
  overflow: auto;
  // & 在less中代表，当前元素的父元素
  // ::-webkit-scrollbar  这个是滚动条中的滚动槽
  // ::-webkit-scrollbar-thumb : 滚动滑块
  &::-webkit-scrollbar {
    background-color: rgb(255, 246, 246);
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(241, 241, 241);
    border-radius: 20px;
  }
}
</style>
