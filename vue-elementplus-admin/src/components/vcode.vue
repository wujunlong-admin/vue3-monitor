<template>
  <img :src="codeSrc"/>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  defineExpose
} from 'vue';
import utils from "../utils/utils.js";

// 图片插入
const lineHeight = ref()

let codeSrc = new URL("../assets/验证码.png", import.meta.url).href;
// 更换验证码图片
const changeCode = () => {
  codeSrc = new URL("../../assets/new_code.png", import.meta.url).href;
}
const refresh = () => {
  changeCode();
}

defineExpose({
  refresh
})

</script>

<style scoped>
.code {
  cursor: pointer;
}

.code img {
  width: 100%;
  height: 100%;
}
</style>