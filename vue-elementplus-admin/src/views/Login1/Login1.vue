<template>
  <div class="login-page">
    <div class="login-header"></div>
    <!-- 登录主题   -->
    <div class="login-panel">
      <div class="inner flex">
        <div class="flex-item logo-panel">
          <!--登录图片-->
          <div class="logo">
            <div class="title">ElementPlus通用管理系统</div>
            <el-image :src="logoImage" class="logo-img"></el-image>
          </div>
        </div>
        <div class="tab-split"></div>
        <div class="flex-item login-form">
          <!--登录提示文字-->
          <div class="login-text">
            <div class="tabs">
              <div class="tabs-itme " @click="checkTab('1')" :class="{'tabs-itme-active': tabCurIndex==1}">
                密码登录
              </div>
              <!--              <div class="tab-split"></div>-->
              <div class="tabs-itme" @click="checkTab('2')" :class="{'tabs-itme-active': tabCurIndex==2}">
                免密登录
              </div>
              <!--              <div class="tab-split"></div>-->
              <div class="tabs-itme" @click="checkTab('3')" :class="{'tabs-itme-active': tabCurIndex==3}">
                密码登录
              </div>
            </div>
          </div>
          <!--登录账户-密码-记住用户-记住密码-->
          <div class="form">
            <PasswoeldLogin :option="lineHeight" v-if="tabCurIndex == 1"></PasswoeldLogin>
            <CodeLogin :option="lineHeight" v-else-if="tabCurIndex == 2"></CodeLogin>
            <QcordLogin :option="lineHeight" v-else="tabCurIndex ==3"></QcordLogin>
          </div>
        </div>
      </div>
    </div>
    <!--版权信息-->
    <div class="login-footer">
      版权所有：VuePuls
    </div>
  </div>
</template>

<script setup>

import {
  ref,
} from 'vue';

import PasswoeldLogin from '../login/components/PassworldLogin.vue'
import CodeLogin from '../login/components/CodeLogin.vue'
import QcordLogin from '../login/components/QcordLogin.vue'

const logoImage = new URL("../../assets/vue.svg", import.meta.url).href;
const tabCurIndex = ref(1)
const checkTab = (index) => {
  tabCurIndex.value = index;
}

</script>

<style scoped>
.login-page {
  background: #409eff9c;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.login-page .login-panel {
  align-items: center;
  display: flex;
  height: 100vh;
}

.login-page .login-panel .inner {
  width: 800px;
  height: 450px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 30px #00000055;
}

.login-page .logo-panel {
  /*background: linear-gradient(-45deg, #3055d2, #b8b9d2);*/
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-top: 50px;
}

.login-page .logo-panel .title {
  line-height: 120px;
  font-size: 22px;
  letter-spacing: 3px;
  text-align: center;
  background-image: -webkit-linear-gradient(right, red, #ff5722, #ff9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-page .logo-panel .logo {
  text-align: center;
}

.login-page .tab-split {
  width: 1px;
  height: 450px;
  background: linear-gradient(45deg, #f4433600, #f44336, #f4433600);
}

.login-page .login-form {
  margin-left: 10px;
}

.login-page .logo-panel .logo .logo-img >>> img {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  box-shadow: 0 0 10px #ffffff55;
  background: #fff;
}

/*.login-page .login-panel .login-text {*/
/*  line-height: 6vh;*/
/*  text-align: center;*/
/*  color: #fff;*/
/*  letter-spacing: 5px;*/
/*  margin: 20px 0;*/
/*}*/

.login-page .login-panel .tabs {
  margin-top: 30px;
  font-size: 16px;
  letter-spacing: 5px;
  display: flex;
  height: 45px;
  line-height: 45px;
}

.login-page .login-panel .tabs .tabs-itme {
  flex: 1;
  cursor: pointer;
  line-height: 45px;
  user-select: none;
  height: 45px;
}

.login-page .login-panel .tabs .tab-split {
  width: 1px;
  height: 45px;
  line-height: 45px;
  /*background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), #fff, rgba(0, 0, 0, 0.5));*/
}

.login-page .login-panel .tabs .tabs-itme-active {
  /*background: #ff5722;*/
  color: #ff5722;
}

.login-page .login-panel .tabs .tabs-itme:first-child {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.login-page .login-panel .tabs .tabs-itme:last-child {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

.login-page .login-panel .form {
  padding: 10px 22px;
}

.login-page .login-footer {
  position: fixed;
  left: 0;
  bottom: 30px;
  width: 100%;
  height: 4vh;
  font-size: 26px;
  color: #fff;
}

</style>