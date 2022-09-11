<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <!-- van-field  : 输入框 text,password ，文本域 -->
    <!-- v-model  用户输入的值 -->
    <!-- name 表示表单项 -->
    <!-- rules (是个数组)  表单校验    {required    是否必选(t or false，也可以用pattern  设置正则判断)}  ,trigger(规则的书法时机 onChange onBlur)
    message:  提示信息 -->
    <van-form @submit="onSubmit" class="form" ref="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
        ><template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"> </span>
        </template>
        <template #button>
          <van-button
            block
            round
            size="small"
            native-type="button"
            class="codeBtn"
            v-if="isShowBtn"
            @click="sendCode"
            >发送验证码
          </van-button>
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            v-else
            @finish="isShowBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'

// 引入api
import { login, sendCodeAPI } from '@/api'

// 引入 vuex
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      // 引入后放在data中
      mobileRules,
      codeRules,
      isShowBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),

    async onSubmit() {
      this.loading()
      try {
        // vant 组件的 submit 事件只有在校验通过后才会触发
        const { data } = await login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        // 把token存进vuex
        // 跳转路由
        this.$router.push('/my')
        this.$toast.success('登录成功')
        // 万能验证码 246810
      } catch (error) {
        // error :1 js的错误 ,2 axios 封装的error对象

        // axios 封装的error对象
        // -error.response.data  后端返回的数据
        // -error.response.status 后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data)
        } else {
          // js导致的错误  或者507
          console.dir(error)
          this.$toast.clear()
          // throw error
        }

        // this.$toast.fail('登录失败')
      }
    },
    loading() {
      this.$toast.loading({
        // forbidClick 禁止点击q其他东西，登录时
        // duration 展示的时长  使用毫秒数， 0 的话是无限展示

        // toast 只能存在一个，可以通过多个toast 顶掉之前的，做到轻提示连接使用
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
    },

    async sendCode() {
      await this.$refs.from.validate('mobile')

      this.loading()

      try {
        await sendCodeAPI(this.mobile)
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          (error.response && error.response.status === 429) ||
          error.response.status === 404
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
        }
      }
      this.isShowBtn = false
    }
  },
  computed: {}
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;

  // vue-cli  提供了一个语法，:deep（） 深度选择器 进行穿透
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.from) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }

  .van-field__button {
    height: 0.64rem;
  }
}
.codeBtn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
