<template>
  <el-form ref="loginForm" :model="logFormData" :rules="loginRules" autocomplete="off" class="formPanel">
    <el-form-item label="" prop="username">
      <el-input prefix-icon="Avatar" v-model="logFormData.username" placeholder="请输入用户名"/>
    </el-form-item>
    <el-form-item label="" prop="password">
      <el-input type="password" prefix-icon="Lock" v-model="logFormData.password" placeholder="请输入密码"/>
    </el-form-item>
    <!--验证码-->
    <div class="flex">
      <div class="flex-item">
        <el-form-item label="" prop="code">
          <el-input prefix-icon="PictureFilled" v-model="logFormData.code"
                    placeholder="请输入验证码" @click="changeCode"/>
        </el-form-item>
      </div>
      <div class="code">
        <vcode></vcode>
      </div>
    </div>
    <!-- 记住用户名-密码-找回密码-->
    <div class="check-line">
      <div>
        <el-form-item label="">
          <el-checkbox v-model="logFormData.rememberUserName" label="记住用户名" size="large"/>
        </el-form-item>
      </div>
      <div class="line-item"></div>
      <div>
        <el-form-item label="">
          <el-checkbox v-model="logFormData.rememberPassWord" label="记住密码" size="large"/>
        </el-form-item>
      </div>
      <div class="line-item"></div>
      <div>
        <router-link to="/resetpwd" class="resetPassword">找回密码</router-link>
      </div>
    </div>
    <el-form-item>
      <el-button type="danger" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted
} from 'vue';

import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router'

import api from "../../../api/api.js"
import utils from "../../../utils/utils.js";
import vcode from "../../../components/vcode.vue";

// 外部传递参数
const option = defineProps({
  lineHeight: {
    type: String,
    required: true
  }
})

// 图片插入
const lineHeight = ref("45px")
// 登录表单数据
const logFormData = reactive({
  username: '',
  password: '',
  code: '',
  rememberUserName: false,
  rememberPassWord: false
});
const loginForm = ref("45px");
// 定义输入框规则
const loginRules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 5, message: '用户名长度应该在3~5字符之间', trigger: 'blur'}
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 15, message: '密码长度应该在6~15字符之间', trigger: 'blur'}
  ]
});

let store = useStore();
const router = useRouter();
const route = useRoute();

// 登录操作
const onSubmit = () => {
  let isOk = true;
  loginForm.value.validate((valie, fields) => {
    if (!valie) {
      if (fields) {
        for (let key in fields) {
          utils.showError(fields[key][0].message)
        }
      }
      return;
    }
    utils.saveData("rememberUserName", logFormData.rememberUserName);
    utils.saveData("rememberPassWord", logFormData.rememberPassWord);
    utils.saveData("username", logFormData.username);
    utils.saveData("password", logFormData.password);
    // TODO 调用登录接口进行登录
    utils.showLoading();
    api.post("http://127.0.0.1:8081/login", JSON.stringify({
      username: logFormData.username,
      password: logFormData.password,
      code: logFormData.code
    })).then((res) => {
      utils.hideLoading();
      if (!res || res.status != 200 || !res.data || res.data.code != 888) {
        if (res.data && res.data.msg) {
          utils.showError(res.data.msg)
        } else {
          utils.showError('登陆失败！')
        }
        return;
      }
      // 1.将传递过来的token进行本地存储及vuex存储
      let token = res.data.token;
      // 使用vuex
      store.commit('setToken', token)
      // 2.将当前登录的用户信息进行本地及vuex存储
      let userinfo = res.data.data;
      store.commit('setUserInfo', JSON.stringify(userinfo))
      router.push({
            path: 'index'
          }
      )
    }).catch(function (error) {
      utils.hideLoading();
      utils.showError('登陆失败wqwqw！')
    })
  });
}

onMounted(() => {
  logFormData.rememberUserName = utils.getData("rememberUserName") === 'true' ? true : false;
  logFormData.rememberPassWord = utils.getData("rememberPassWord") === 'true' ? true : false;
  if (logFormData.rememberUserName) {
    logFormData.username = utils.getData("username");
  } else {
    logFormData.username = "";
  }
  if (logFormData.rememberPassWord) {
    logFormData.password = utils.getData("password");
  } else {
    logFormData.password = "";
  }
})
</script>

<style scoped>
.formPanel >>> .el-input__prefix-inner {
  color: #000;
  font-size: 20px;
}

.formPanell >>> .el-checkbox__label {
  color: #fff;
}

.formPanel >>> .el-form-item__label {
  line-height: 45px;
  height: 45px;
}

.formPanel >>> .el-form-item__label {
  line-height: 45px;
  height: 45px;
}

.formPanel >>> .el-form-item__content {
  line-height: 45px;
  height: 45px;
}

.formPanel >>> .el-input__inner {
  line-height: 45px;
  height: 40px;
}

.formPanel .check-line {
  display: flex;
}

.formPanel .check-line .line-item {
  flex: 1;
}

.formPanel >>> .el-button {
  width: 100%;
  line-height: 45px;
  height: 45px;
  border-radius: 45px;
}

.formPanel .code {
  width: 110px;
  height: 47px;
  padding-left: 10px;
  cursor: pointer;
}

.formPanel .resetPassword {
  line-height: 45px;
  height: 45px;
  text-decoration: none;
  color: red;
  font-size: 14px;
}

</style>