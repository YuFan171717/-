<template>
  <div>
    <!-- 二级路由 -->
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- 导航区 -->

    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span class="p_text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span class="p_text">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/QA">
        <template #icon>
          <span class="toutiao toutiao-wenda"> </span>
          <span class="p_text">问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span class="p_text">{{ isLogin ? '我的' : '未登录' }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {},
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .p_text {
    font-size: 30px;
  }
}
</style>
