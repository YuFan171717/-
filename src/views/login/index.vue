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
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '手机号格式错误'
          }
        ]"
        ><template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /[0-9]{6}/, message: '验证码错误' }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"> </span>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit() {}
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
}
</style>
