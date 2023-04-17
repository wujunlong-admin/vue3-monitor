<template>
  <div :class="[curTheme]" class="successPanel">
    <div class="icon">
      <el-icon><Select/></el-icon>
    </div>
    <div class="desc">密码重置成功，请重新登录！</div>
    <div class="btns">
      <el-button type="primary" @click="onSubmit">返回登录</el-button>
    </div>
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
import {useRouter, useRoute} from 'vue-router'

const route =  useRoute();
const router = useRouter();

let curTheme = config.curTheme;
const option = defineProps({
  lineHeight: {
    type: String,
    required: true
  }
});
// 自定义事件
// const emit = defineEmits(['toNext', 'toPre'])

const onSubmit = () => {
  router.push({
    path:'login'
  })
}

</script>

<style scoped>
.successPanel {
  width: 45px;
  min-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
}

.successPanel .icon {
  font-size: 60px;
  text-align: center;
  line-height: 100%;
  color: #67C23A;
}

.successPanel .desc {
  line-height: 45px;
  font-size: 16px;
  text-align: center;
  color: #67C23A;
}

.successPanel .btns {
  text-align: center;
  margin-top: 50px;
}

.successPanel .btns .el-button--primary {
  width: 100%;
  line-height: 45px;
  height: 45px;
}
</style>