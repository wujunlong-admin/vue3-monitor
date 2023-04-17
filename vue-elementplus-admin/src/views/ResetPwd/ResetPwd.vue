<template>
  <div :class="[curTheme]">
    <div class="resetpwd-page">
      <div class="resetpwd-header">
        <div class="flex">
          <div class="logo">
            <img :src="logoImage">
          </div>
          <div class="system-name">{{ systemName }}</div>
          <div class="flex-item"></div>
          <div class="btns">
            <router-link class="login-btn" to="/login">返回登录</router-link>
          </div>
        </div>
      </div>
      <div class="resetpwd-content">
        <div>
          <div class="tabs flex">
            <div class="flex-item"></div>
            <div class="flex">
              <div class="tab-item" :class="{'tab-item-selecten':curTab == 1}" @click="changeTab(1)">手机找回</div>
              <div class="tab-item-split"></div>
              <div class="tab-item" :class="{'tab-item-selecten':curTab == 2}" @click="changeTab(2)">邮箱找回</div>
            </div>
            <div class="flex-item"></div>
          </div>
          <div class="tab-contents">
            <PhoneReaetPwd v-if="curTab == 1"></PhoneReaetPwd>
            <EmailResetPwd v-if="curTab == 2"></EmailResetPwd>
          </div>
        </div>
      </div>
      <div class="resetpwd-footer">版权：{{ systemName }}</div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted
} from 'vue';

import utils from '../../utils/utils.js';
import config from "../../store/config.js";

let curTheme = config.curTheme;
let systemName = config.systemName;
let lineHeight = config.resetpwd.lineHeight;
let bgColor = config.resetpwd.bgColor;

let curTab = ref(1);

const changeTab = (index) => {
  curTab.value = index;
}

const logoImage = new URL("../../assets/vue.svg", import.meta.url).href;

import EmailResetPwd from './components/EmailResetPwd.vue';
import PhoneReaetPwd from './components/PhoneReaetPwd.vue';

</script>

<style scoped>
.resetpwd-page {
  background: v-bind(bgColor);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.resetpwd-page .resetpwd-header {
  height: 60px;
  padding: 0 1px;
}

.resetpwd-page .resetpwd-header .flex .logo {
  height: 100%;
  justify-items: center;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
  display: flex;
}

.resetpwd-page .resetpwd-header .flex .logo img {
  height: 60%;
}

.resetpwd-page .resetpwd-header .system-name {
  line-height: 60px;
  margin-left: 10px;
  font-size: 24px;
  letter-spacing: 5px;
  background-image: -webkit-linear-gradient(right, red, #ff5722, #ff9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.resetpwd-page .resetpwd-header .btns {
  justify-content: center;
  justify-items: center;
  vertical-align: middle;
  align-items: center;
  display: flex;
}

.resetpwd-page .resetpwd-header .login-btn {
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  line-height: 35px;
  height: 35px;
  width: 100%;
  text-align: center;
  border-radius: 1px;
}

.resetpwd-page .resetpwd-header .login-btn:hover {
  background: #00000055;
}

.resetpwd-page .resetpwd-content {
  width: calc(70% - 60px);
  margin: 0 auto;
  min-width: 800px;
  height: calc((100% - 60px - 4vh - 60px) * 0.8);
  background-color: #fff;
  margin-top: calc((100% - 60px - 4vh - 60px) * 0.05);
  border-radius: 5px;
  box-shadow: 0 0 15px #00000055;
  padding: 30px;
}

.resetpwd-page .resetpwd-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4vh;
  font-size: 14px;
  text-align: center;
  color: #fff;
}

.resetpwd-page .resetpwd-content .tabs {
  text-align: center;
  height: v-bind(lineHeight);
  line-height: v-bind(lineHeight);
  border-radius: 5px;
}

.resetpwd-page .resetpwd-content .tabs .tab-item {
  width: 250px;
  color: #222;
  background-color: #bdbdbd;
  user-select: none;
  cursor: pointer;
}
.resetpwd-page .resetpwd-content .tabs .tab-item:hover,
.resetpwd-page .resetpwd-content .tabs .tab-item-selecten {
  color: #fff;
  background-color: #2196f3;
}

.resetpwd-page .resetpwd-content .tabs .tab-item:first-child {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.resetpwd-page .resetpwd-content .tabs .tab-item:last-child {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

.resetpwd-page .resetpwd-content .tabs .tab-item-split {
  width: 1px;
  background: #00000055;
}

.resetpwd-page .resetpwd-content .tab-contents {
  padding: 50px 0;
}

</style>