<template>
  <div :class="[curTheme]">
    <el-steps :active="setIdex" align-center>
      <el-step title="身份验证" description="验证用户名密码信息"/>
      <el-step title="重置密码" description="重新设置密码"/>
      <el-step title="找回成功" description="设置成功"/>
    </el-steps>
    <el-form ref="loginForm" :model="logFormData" :rules="loginRules"
             autocomplete="off" class="formPanel" v-if="setIdex == 1">
      <el-form-item label="" prop="username">
        <el-input prefix-icon="Avatar" v-model="logFormData.username" placeholder="请输入电话号码"/>
      </el-form-item>
      <div class="flex">
        <div class="flex-item">
          <el-form-item label="" prop="smscode">
            <el-input type="nuber" prefix-icon="Lock" v-model="logFormData.smscode" placeholder="请输入短信验证码"/>
          </el-form-item>
        </div>
        <div class="code">
          <el-button type="primary" @click="getSmsCode" class="smscode-btn"
                     :disabled="isCodeIng">{{ smsCodeBtnText }}
          </el-button>
        </div>
      </div>
      <!--验证码-->
      <div class="flex">
        <div class="flex-item">
          <el-form-item label="" prop="code">
            <el-input prefix-icon="PictureFilled" v-model="logFormData.code"
                      placeholder="请输入验证码" @click="changeCode"/>
          </el-form-item>
        </div>
        <div class="code">
          <vcode ref="vcodeRef"></vcode>
        </div>
      </div>
      <el-form-item>
        <el-button type="danger" @click="onSubmit">下一步</el-button>
      </el-form-item>
    </el-form>
    <ResetPwdForm v-else-if="setIdex == 2" @toNext="toSuccess" @toPre="toCodeForm"></ResetPwdForm>
    <ResetPwdSuccess v-else-if="setIdex == 3"></ResetPwdSuccess>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  reactive,
  onUnmounted
} from 'vue';

import utils from '../../../utils/utils.js';
import config from "../../../store/config.js";
import vcode from "../../../components/vcode.vue";
import ResetPwdForm from './ResetPwdForm.vue'
import ResetPwdSuccess from './ResetPwdSuccess.vue'

let curTheme = config.curTheme;
const vcodeRef = ref()

// 当前到了第几步
let setIdex = ref(1);

const option = defineProps({
  lineHeight: {
    type: String,
    required: true
  }
});
const logFormData = reactive({
  username: '',
  smscode: '',
  code: ''
});

// 标识是否正在获取短信验证码
let isCodeIng = ref(false);
//定时器
let timer = null;
//定时器的时间
let curTime = ref(60);
//获取验证码按钮提示文字
let smsCodeBtnText = ref("获取验证码");

// 获取验证码
const getSmsCode = () => {
  if (!logFormData.username) {
    utils.showError("电话号码不能为空！")
    return;
  }
  if (!logFormData.code) {
    utils.showError("请先输入验证码！")
    return;
  }
  isCodeIng.value = true;
  timer && clearInterval(timer);
  curTime.value = 60;
  timer = setInterval(() => {
    smsCodeBtnText.value = curTime.value + "秒后重新获取";
    curTime.value--;
    if (curTime.value <= 0) {
      isCodeIng.value = false;
      timer && clearInterval(timer);
      smsCodeBtnText.value = "获取验证码";
    }
  }, 1000)
}
const loginForm = ref();

// 自定义规则验证
const validatePassPhone = (rule, value, callback) => {
  if (!utils.check.checkPhone(value)) {
    callback("电话号码不合法！")
  } else {
    callback()
  }
}

// 定义输入框规则
const loginRules = reactive({
  username: [
    {required: true, message: '请输入电话号码', trigger: 'blur'},
    {min: 11, max: 11, message: '电话号码长度应该为11数字', trigger: 'blur'},
    {validator: validatePassPhone, trigger: 'blur'}
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
  ],
  smscode: [
    {required: true, message: '请输入短信验证码', trigger: 'blur'},
    {min: 6, max: 15, message: '短信验证码长度应该在6~15字符之间', trigger: 'blur'}
  ]
});
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
    }
  });
  if (!isOk) {
    return;
  }
  //TODO 调用接口验证电话号码和验证码是否匹配
  if (logFormData.smscode != '111111') {
    utils.showError("验证码不正确！");
  } else {
    setIdex.value = 2;
  }
}

// 跳转成功页面
const toSuccess = () => {
  setIdex.value = 3;
}

// 跳转修改页面
const toCodeForm = () => {
  setIdex.value = 1;
  vcodeRef.value.refresh();
}
onMounted(() => {

});
onUnmounted(() => {
  timer && clearInterval(timer);
});


</script>

<style scoped>
.formPanel {
  width: 45px;
  min-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
}

.formPanell:deep(.el-checkbox__label) {
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
  /*border-radius: 45px;*/
}

.formPanel .smscode-btn {
  width: calc(100% - 0px);
  line-height: 45px;
  height: 45px;
  margin-left: 0px;
  border-radius: 0;
}

.formPanel .code {
  width: 110px;
  height: 47px;
  padding-left: 10px;
  cursor: pointer;
}

.formPanel .code img {
  width: 100%;
  height: 100%;
}

.formPanel .resetPassword {
  line-height: 45px;
  height: 45px;
  text-decoration: none;
  color: red;
  font-size: 14px;
}

</style>