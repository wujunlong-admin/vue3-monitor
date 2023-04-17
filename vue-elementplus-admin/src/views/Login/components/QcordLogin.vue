<template>
  <div class="qcode">
    <img :src="qcodeSrc" @click="getQcode" :class="{'end': curTime <=0}"/>
    <div class="info">请使用微信或客户端App扫描登录系统</div>
    <div class="endInfo" @click="getQcode" v-if="curTime <=0">二维码已失效，点击重新发送</div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  onUnmounted
} from 'vue';
import utils from "../../../utils/utils";

//定时器
let timer = null;
//定时器的时间
let curTime = ref(60);


let qcodeSrc = ref("");

const getQcode = () => {
  qcodeSrc.value = new URL("../../../assets/qcode.png", import.meta.url).href;
  curTime.value = 60;
  timer && clearInterval(timer);
  timer = setInterval(() => {
    curTime.value--;
    if (curTime.value <= 0) {
      timer && clearInterval(timer);
    }
  }, 1000)
}
onMounted(() => {
  getQcode()
});
onUnmounted(() => {
  timer && clearInterval(timer);
});

</script>

<style scoped>
.qcode {
  background: #ffffff55;
  padding: 20px;
  box-shadow: 0 0 20px #ffffff33;
  border-radius: 5px;
  border: 1px solid #ffffff88;
  height: 305px;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.qcode img {
  height: calc(100% - 30px);
}

.qcode .info {
  font-size: 14px;
  line-height: 30px;
  text-align: center;
}

.qcode .endInfo {
  position: absolute;
  left: 0;
  top: 0;
  color: red;
  font-size: 14px;
  width: 100%;
  height: calc(100% - 30px);
  text-align: center;
  justify-content: center;
  justify-items: center;
  vertical-align: middle;
  align-items: center;
  display: flex;
}

.qcode .end {
  -webkit-filter: brightness(0.1);
}
</style>