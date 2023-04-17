<template>
  <el-form ref="loginForm" :model="formData" :rules="loginRules"
           autocomplete="off" class="formPanel">
    <el-form-item label="" prop="passworld">
      <el-input type="password" prefix-icon="Lock" v-model="formData.passworld" placeholder="请输入新密码"/>
    </el-form-item>
    <el-form-item label="" prop="passworldConfirm">
      <el-input type="password" prefix-icon="Lock" v-model="formData.passworldConfirm" placeholder="请确认密码"/>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="onSubmit">下一步</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="onPre">上一步</el-button>
    </el-form-item>
  </el-form>
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

let curTheme = config.curTheme;

let setIdex = ref(1);

const option = defineProps({
  lineHeight: {
    type: String,
    required: true
  }
});

// 自定义事件
const emit = defineEmits(['toNext', 'toPre'])

const loginForm = ref();
// 登录表单数据
const formData = reactive({
  passworld: '',
  passworldConfirm: ''
});
// 自定义规则验证
const validatePass = (rule, value, callback) => {
  callback()
}
// 自定义规则验证
const validatePassConfire = (rule, value, callback) => {
  if (value != formData.passworld) {
    callback("两次密码不一致")
  } else {
    callback()
  }
}

// 定义输入框规则
const loginRules = reactive({
  passworld: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 5, max: 10, message: '电话号码长度应该为5-10数字', trigger: 'blur'},
    {validator: validatePass, message: '密码需要包含大小写、特殊字符、数字等。', trigger: 'blur'}
  ],
  passworldConfirm: [
    {required: true, message: '请确认密码', trigger: 'blur'},
    {min: 5, max: 10, message: '电话号码长度应该为5-10数字', trigger: 'blur'},
    {validator: validatePassConfire, trigger: 'blur'}
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
      return;
    }
    //TODO 提交后台修改密码
    emit('toNext', {});
  });
}
const onPre = () => {
  emit('toPre', {});
}
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