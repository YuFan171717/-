<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登陆的 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <!-- <van-col span="1"></van-col> -->
          <van-col span="12" style="height: 100%">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile"> 131111111</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5" class="btn">
            <van-row type="flex" justify="center" align="center" class="btn">
              <van-button round size="mini" class="editBtn">
                编辑按钮
              </van-button>
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false">
            <van-grid-item text="头条">
              <template #icon>
                <span> {{ userInfo.art_count }} </span>
              </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>
                <span> {{ userInfo.fans_count }} </span>
              </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>
                <span> {{ userInfo.follow_count }} </span>
              </template>
            </van-grid-item>
            <van-grid-item text="收藏">
              <template #icon>
                <span> {{ userInfo.like_count }} </span>
              </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登陆的 -->
      <div class="logOut banner" v-else @click="$router.push('/login')">
        <van-image width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <span class="text">登陆注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
    </main>

    <!-- 底部 -->
    <footer>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
      <van-button block v-if="isLogin" style="color: red" @click="loginOut"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'

// 获取用户信息
import { getUserInfo } from '@/api'
export default {
  name: 'my',
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async loginOut() {
      await this.$dialog.confirm({
        title: '黑马偷塔',
        message: '是否确认退出该账户'
      })

      this.$store.commit('SET_TOzKEN', {})
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        // js导致 或者 axios导致的
        // js和 状态码400,506提示给程序员。401提示给用户重新登录
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
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
.my {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 30px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.logOut {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .btn {
    height: 100%;
  }
  .editBtn {
    width: 1.66rem;
    height: 0.4237rem;
    color: #666;
  }
  :deep(.van-grid-item__content) {
    // inherit  继承父元素属性
    font-size: 20px;

    background-color: inherit;

    color: #fff;
    .van-grid-item__text {
      color: inherit;
    }
  }
}
</style>
