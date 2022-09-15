<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        show-action
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史 搜索建议  搜索结果-->

    <!-- <search-hstory></search-hstory>
    <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult> -->
    <component
      :is="componentName"
      :keywords="keywords"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
// 引入组件
import SearchHstory from './components/SearchHstory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'

import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHstory,
    SearchSuggestion,
    SearchResult
  },

  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 去重
      const distinctHistories = [...new Set([keywords, ...this.histories])]

      this.SET_HISTORIES(distinctHistories)
      this.isShowSearchResult = true
      this.keywords = keywords
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史：搜索框没有值或空格
      // 搜索建议，挡搜索框有值，并且不渲染搜索结果
      // 搜索结果，触发搜索时
      if (this.keywords === '') {
        return 'SearchHstory'
      }

      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
