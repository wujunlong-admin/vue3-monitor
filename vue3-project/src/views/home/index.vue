<template>
  <h1>{{obj.name}}</h1>
</template>

<script setup>
import {reactive} from 'vue'
const obj = reactive({name:'首页'})
</script>