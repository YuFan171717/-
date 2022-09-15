<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in higLightSuggestions"
      :key="index"
      @click="$emit('change-keywords', suggertion[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串,修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果

//  yarn add lodash  防抖插件
import { debounce } from 'lodash'
import { getSuggestionsAPI } from '@/api'

export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return { suggertion: [] }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        // this.suggertion = data.data.options.filter((item) => Boolean(item))
        this.suggertion = data.data.options.filter(Boolean)
        // 合并同类项
        // Boolean  是windows的内置方法，可以判断值是否是null或undifined  等   。能够过滤数组中的假值
      } catch (error) {
        if (error.response) {
          this.$toast.fail('请重新搜索')
        } else {
          throw error
        }
      }
    }, 300)
  },
  computed: {
    higLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggertion.map((str) => {
        // match  是匹配的字符串
        return str.replace(
          reg,
          (match) => `<span style="color:red;">${match}</span>`
        )
      })
    }
  }
}
</script>

<style></style>
