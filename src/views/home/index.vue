<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          round
          block
          icon="search"
          size="small"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 频道和文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
      <van-popup
        v-model="isShow"
        position="bottom"
        :style="{ height: '100%' }"
        closeable
        close-icon-position="top-left"
      >
        <channel-edit
          :myChannels="channels"
          @change-active=";[(isShow = false), (active = $event)]"
          @del-channels="delChannels"
          @add-channels="addChannels"
          v-if="isShow"
        ></channel-edit>
      </van-popup>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'

import { mapGetters, mapMutations } from 'vuex'
// 引入组件
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
export default {
  created() {
    this.initChannels()
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    //   if (error.response && error.response.status === 401)  下面是可选链操作 意思和注释一样
    //     if (error.response?.status === 401)
    // 可选连操作符，如果前面是undifined 那么不会往后取值

    initChannels() {
      // 判断是否登录
      if (this.isLogin) {
        this.getChannel()
      } else {
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = myChannels
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        // console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        // js 错误给程序员  ,axios 状态码提示用户刷新
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          // status === 507 ?? this.$toast.fail('请刷新')
          // ?? 是前面的值如果是null 或undifined，那么就执行后面的，反过来执行前面的。?? 相当于 ||

          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },

    // del-channels
    async delChannels(id) {
      try {
        const newChannels = (this.channels = this.channels.filter(
          (item) => item.id !== id
        ))
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          this.SET_MY_CHANNELS(newChannels)
        }

        this.$toast.success('删除成功~')
      } catch (error) {
        if (error.response?.status === 401) {
          this.$toast.fail('请登录后删除')
        } else {
          throw error
        }
      }
    },
    async addChannels(item) {
      try {
        if (this.isLogin) {
          await addChannelAPI(item.id, this.channels.length)
        } else {
          // item 是需要添加的心频到，。。。把就数组解构后在放入新的item，成为一个新数组
          this.SET_MY_CHANNELS([...this.channels, item])
        }
        this.channels.push(item)
        this.$toast.success('添加成功~')
      } catch (error) {
        if (error.response?.status === 401) {
          this.$toast.fail('请登录后添加')
        } else {
          throw error
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 20px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
