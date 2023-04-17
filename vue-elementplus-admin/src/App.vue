<script setup>
import config from "../src/store/config.js";
let curTheme = config.curTheme;
</script>

<template>
  <div :class="[curTheme]">
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
